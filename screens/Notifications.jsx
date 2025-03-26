import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "urql";
import { GET_USER_NOTIFICATIONS } from "../graphql/queries";
import getTime from "../lib/getTime";
import Title from "../components/Title";
import Comment from "../icons/Comment";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";

const NotificationsScreen = ({ navigation }) => {
  // ✅ Fetch notifications from GraphQL
  const [{ data, fetching, error }] = useQuery({
    query: GET_USER_NOTIFICATIONS,
  });
  const [notifications, setNotifications] = useState([]);

  // ✅ Update local state when data is fetched
  useEffect(() => {
    if (data?.getUserNotifications) {
      setNotifications(data?.getUserNotifications);
    }
  }, [data]);

  // ✅ Function to mark notifications as read
  const handleNotificationPress = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    );
  };

  // ✅ Show loading indicator while fetching data
  if (error) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
        حدث خطأ أثناء تحميل الإشعارات
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}

      <Title title={"الإشعارات"} />

      {fetching ? (
        <FlatList
          data={[1, 2, 3, 4]} // Show 4 skeleton items while loading
          keyExtractor={(item) => item.toString()}
          renderItem={() => <MessageSkeleton />}
        />
      ) : (
        <ScrollView>
          {notifications.length === 0 ? (
            <Text style={styles.noNotifications}>لا توجد إشعارات</Text>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationItem]}
              >
                {notification.type === "comment" && (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#05595B",
                      borderRadius: 50,
                    }}
                  >
                    <Comment />
                  </View>
                )}
                {notification.type === "post" && (
                  <Image size={40} source={require("../assets/badge.png")} />
                )}

                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.content}
                  </Text>
                </View>

                <Text style={styles.notificationTime}>
                  {getTime(notification.createdAt)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  unreadNotification: {
    backgroundColor: "#E3F2FD",
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
    fontFamily: "AvenirArabic-Medium",
  },
  noNotifications: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
    fontFamily: "AvenirArabic-Medium",
  },
});

export default NotificationsScreen;
