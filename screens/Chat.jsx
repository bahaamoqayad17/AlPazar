import { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import {
  GET_CONVERSATIONS,
  GET_MESSAGES,
  ON_NEW_MESSAGE,
} from "../graphql/queries";
import { CREATE_CONVERSATION, SEND_MESSAGE } from "../graphql/mutations";
import { useMutation, useQuery, useSubscription } from "urql";
import SendComment from "../icons/sendComment";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = ({ route }) => {
  const { userId, receiver, conversationId: propConversationId } = route.params;
  const [conversationId, setConversationId] = useState(
    propConversationId || null
  );
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const navigation = useNavigation();

  // ✅ Fetch existing conversations (Only if no conversationId was provided)
  const [{ data: conversationData }, reexecuteConversations] = useQuery({
    query: GET_CONVERSATIONS,
    pause: !!conversationId, // Skip fetching conversations if conversationId exists
  });

  // ✅ Fetch old messages
  const [{ data: messageData, fetching }, reexecuteMessages] = useQuery({
    query: GET_MESSAGES,
    variables: { conversationId },
    pause: !conversationId, // Only run when conversationId exists
  });

  // ✅ Mutations
  const [, createConversation] = useMutation(CREATE_CONVERSATION);
  const [, sendMessage] = useMutation(SEND_MESSAGE);

  // ✅ Real-time message subscription
  useSubscription(
    { query: ON_NEW_MESSAGE, variables: { conversationId } },
    (_, newMessage) => {
      if (newMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          newMessage.onNewMessage,
        ]);
      }
    }
  );

  // ✅ Load old messages into state when received
  useEffect(() => {
    if (messageData?.messages) {
      setMessages(messageData.messages);
    }
  }, [messageData]);

  // ✅ Find or create conversation (Only if conversationId is NOT provided)
  useEffect(() => {
    if (!conversationId && conversationData?.getConversations) {
      const existingConversation = conversationData.getConversations.find(
        (convo) => convo.participants.some((user) => user.id === receiver.id)
      );

      if (existingConversation) {
        setConversationId(existingConversation.id);
        reexecuteMessages(); // ✅ Fetch old messages
      } else {
        createConversation({ user1: userId, user2: receiver.id }).then(
          (res) => {
            if (res.data?.createConversation) {
              setConversationId(res.data.createConversation.id);
              reexecuteConversations(); // ✅ Refresh conversation list
            }
          }
        );
      }
    }
  }, [conversationData]);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || !conversationId) return;

    await sendMessage({
      sender: userId,
      receiver: receiver.id,
      conversation: conversationId,
      content: inputText,
    });

    setInputText("");
  }, [inputText, conversationId]);

  return (
    <View style={styles.container}>
      {/* ✅ Header with dynamic receiver info */}
      <View style={styles.header}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("Profile", { userId: receiver?.id })
          }
        >
          <Avatar.Image
            size={40}
            source={{
              uri: receiver?.image?.startsWith("http")
                ? receiver?.image
                : `${process.env.EXPO_PUBLIC_API_URL}${receiver?.image}`,
            }}
          />

          <Text style={styles.headerTitle}>{receiver.name}</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconButton icon="arrow-left" size={18} iconColor="#05595B" />
        </TouchableOpacity>
      </View>

      {/* ✅ Messages Section */}
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {fetching ? (
          <Text style={styles.loadingText}>تحميل المحادثة...</Text>
        ) : (
          messages.map((msg) => (
            <View
              key={msg?.id}
              style={[
                styles.messageBubble,
                msg?.sender?.id === userId
                  ? styles.senderStyle
                  : styles.receiverStyle,
              ]}
            >
              <Text
                style={
                  msg?.sender?.id === userId
                    ? styles.senderText
                    : styles.receiverText
                }
              >
                {msg?.content}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* ✅ Input Field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write your message"
            placeholderTextColor="#A0A0A0"
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleSend()}
          >
            <SendComment />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  senderText: {
    color: "#fff",
    fontFamily: "AvenirArabic-Medium",
  },
  receiverText: {
    color: "#656565",
    fontFamily: "AvenirArabic-Medium",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#004D43",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#05595B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    marginLeft: 10,
    color: "#05595B",
  },

  /* Messages Styles */
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  senderStyle: {
    backgroundColor: "#05595B",
    alignSelf: "flex-start",
    borderTopRightRadius: 0,
  },
  receiverStyle: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-end",
    borderBottomLeftRadius: 0,
  },

  /* Input Field Styles */
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#05595B",
    paddingHorizontal: 15,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "AvenirArabic-Medium",
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default ChatScreen;
