import { useEffect, useState, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Text, Avatar, ActivityIndicator, Searchbar } from "react-native-paper";
import { useQuery } from "urql";
import { GET_CONVERSATIONS } from "../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../icons/Search";
import getTime from "../lib/getTime";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";

const Messages = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [{ data, fetching, error }] = useQuery({ query: GET_CONVERSATIONS });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse user data
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
        حدث خطأ أثناء تحميل المحادثات
      </Text>
    );
  }

  const conversations = data?.getConversations || [];

  // ✅ Only use useMemo when user data is ready
  const filteredConversations = useMemo(() => {
    if (!user || !conversations) return conversations;

    if (!searchQuery) return conversations;

    return conversations.filter((item) => {
      const otherParticipant =
        item.participants.find((p) => p.id !== user._id) ||
        item.participants[0];

      return otherParticipant?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [conversations, searchQuery, user]);

  const renderMessageItem = ({ item }) => {
    const otherParticipant =
      item.participants.find((p) => p.id !== user?._id) || item.participants[0];

    return (
      <TouchableOpacity
        style={styles.messageContainer}
        onPress={() =>
          navigation.navigate("Chat", {
            propConversationId: item.id,
            receiver: otherParticipant,
          })
        }
      >
        {!item.lastMessage?.isRead && <View style={styles.unreadIndicator} />}

        <Avatar.Image
          size={50}
          source={{
            uri: otherParticipant?.image?.startsWith("http")
              ? otherParticipant?.image
              : `${process.env.EXPO_PUBLIC_API_URL}${otherParticipant?.image}`,
          }}
        />

        <View style={styles.messageContent}>
          <Text style={styles.messageName}>
            {otherParticipant?.name || "مستخدم مجهول"}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.lastMessage?.content}
          </Text>
        </View>
        <View style={styles.messageTimeContainer}>
          <Text style={styles.messageTime}>
            {getTime(item?.lastMessage?.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الرسائل</Text>
      </View>

      <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
        <Searchbar
          placeholder="ابحث عن شخص"
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          icon={() => <Search />}
          iconColor="#05595B"
          inputStyle={{ fontFamily: "AvenirArabic-Medium" }}
        />
      </View>

      <FlatList
        data={fetching ? [1, 2, 3, 4] : filteredConversations}
        keyExtractor={(item) => (fetching ? item.toString() : item.id)}
        renderItem={({ item }) =>
          fetching ? <MessageSkeleton /> : renderMessageItem({ item })
        }
        ListEmptyComponent={
          !fetching && <Text style={styles.noMessages}>لا توجد محادثات</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: "#EAF1F1",
    borderRadius: 25,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#05595B",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  messageContent: { flex: 1, marginLeft: 10 },
  messageName: { fontSize: 16, fontFamily: "AvenirArabic-Heavy" },
  messageText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "AvenirArabic-Medium",
  },
  messageTimeContainer: { alignItems: "flex-end" },
  messageTime: {
    fontSize: 12,
    color: "#888",
    fontFamily: "AvenirArabic-Medium",
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008080",
    marginTop: 4,
    position: "absolute",
    left: 10,
    top: 10,
  },
  noMessages: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
});

export default Messages;
