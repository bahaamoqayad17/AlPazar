import { View, StyleSheet } from "react-native";
import { Card, Text, Title } from "react-native-paper";
import Star from "../icons/Star";

const ProfileToOthers = ({ posts }) => {
  return (
    <View>
      <Text style={{ marginHorizontal: 15, fontFamily: "AvenirArabic-Medium" }}>
        {posts?.length} إعلانات
      </Text>

      {posts?.map((ad) => (
        <Card key={ad.id} style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Card.Cover
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}${ad?.images[0]}`,
            }}
          />

          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
              alignItems: "center",
            }}
          >
            <Title
              style={{
                maxWidth: 200,
                fontFamily: "AvenirArabic-Heavy",
                color: "#05595B",
              }}
            >
              {ad.title}
              {ad?.paid && <Star />}
            </Title>

            <Text
              style={{
                color: ad.status === "active" ? "#05595B" : "#888",
                fontFamily: "AvenirArabic-Heavy",
              }}
            >
              {ad?.status === "active" ? "متاح للعرض" : "متوقف الآن"}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

export default ProfileToOthers;

const styles = StyleSheet.create({
  adCard: {
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  adImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  adContent: {
    flexDirection: "row",
    width: "70%",
    padding: 10,
    gap: 10,
  },
  editProfileSection: {
    padding: 20,
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#05595B",
    paddingVertical: 10,
    borderRadius: 8,
    width: "80%",
  },
});
