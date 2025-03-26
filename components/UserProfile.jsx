import { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import {
  Button,
  Card,
  List,
  Switch,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { useMutation } from "urql";
import {
  DeleteMyUser,
  SET_STATUS,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import Star from "../icons/Star";

const UserProfile = ({ posts, item, setItem }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("ads");
  const [_, setStatus] = useMutation(SET_STATUS);
  const [__, deleteUser] = useMutation(DeleteMyUser);
  const [___, updateProfile] = useMutation(UPDATE_PROFILE);
  const [____, updatePassword] = useMutation(UPDATE_PASSWORD);
  const navigation = useNavigation();

  const toggleAdStatus = async (postId, currentStatus) => {
    try {
      const status = currentStatus === "active" ? "inactive" : "active";

      const data = await setStatus({
        postId,
        status,
      });

      console.log("✅ Status updated successfully:", data?.updateStatus);
    } catch (error) {
      console.log("❌ Error updating status:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteUser();
      if (data) navigation.navigate("Login");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await updateProfile({
        input: item,
      });

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePassoword = async () => {
    try {
      const { data } = await updatePassword({
        oldPassword,
        newPassword,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("ads")}
          style={[
            styles.tab,
            selectedTab === "ads" ? styles.activeTab : styles.inactiveTab,
          ]}
        >
          <Text style={styles.tabText}>إعلاناتي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("edit")}
          style={[
            styles.tab,
            selectedTab === "edit" ? styles.activeTab : styles.inactiveTab,
          ]}
        >
          <Text style={styles.tabText}>تعديل الملف الشخصي</Text>
        </TouchableOpacity>
      </View>

      {/* Render Ads or Edit Profile */}
      {selectedTab === "ads" ? (
        <View>
          {posts?.map((ad) => (
            <Card
              key={ad.id}
              style={{ marginHorizontal: 20, marginVertical: 10 }}
            >
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

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: ad.status === "active" ? "#05595B" : "#888",
                      fontFamily: "AvenirArabic-Heavy",
                    }}
                  >
                    {ad?.status === "active" ? "نشط الآن" : "متوقف"}
                  </Text>
                  <Switch
                    value={ad?.status === "active"}
                    onValueChange={() => toggleAdStatus(ad?.id, ad?.status)}
                    color="#05595B"
                  />
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      ) : (
        <View style={styles.editProfileSection}>
          <TextInput
            label="اسم المستخدم"
            value={item?.name}
            onChangeText={(name) => setItem({ ...item, name })}
            mode="outlined"
            style={styles.input}
            contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
          />
          <TextInput
            label="البريد الإلكتروني"
            value={item?.email}
            disabled
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
          />
          <TextInput
            label="رقم الهاتف"
            value={item?.mobile_number}
            onChangeText={(mobile_number) =>
              setItem({ ...item, mobile_number })
            }
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
          />
          <TextInput
            label="الدولة"
            value={item?.country}
            onChangeText={(country) => setItem({ ...item, country })}
            mode="outlined"
            style={styles.input}
            contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
          />

          <TextInput
            label="المدينة"
            value={item?.city}
            onChangeText={(city) => setItem({ ...item, city })}
            mode="outlined"
            style={styles.input}
            contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
          />

          {/* Password Change Section - Expandable */}
          <List.Accordion
            title="تغيير كلمة المرور"
            expanded={isPasswordExpanded}
            onPress={() => setIsPasswordExpanded(!isPasswordExpanded)}
            titleStyle={{ fontFamily: "AvenirArabic-Heavy" }}
          >
            <TextInput
              label="كلمة المرور القديمة"
              value={oldPassword}
              onChangeText={setOldPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
            />
            <TextInput
              label="كلمة المرور الجديدة"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
            />
            <TextInput
              label="تأكيد كلمة المرور الجديدة"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
            />

            <Button
              mode="contained"
              onPress={() => handleSavePassoword()}
              style={styles.saveButton}
              labelStyle={{
                fontFamily: "AvenirArabic-Heavy",
              }}
            >
              تغيير كلمة المرور
            </Button>
          </List.Accordion>

          <Button
            mode="contained"
            onPress={() => handleUpdate()}
            style={styles.saveButton}
            labelStyle={{
              fontFamily: "AvenirArabic-Heavy",
            }}
          >
            حفظ التغييرات
          </Button>

          <Button
            mode="contained"
            onPress={() => handleDelete()}
            style={[styles.saveButton, { backgroundColor: "red" }]}
            labelStyle={{
              fontFamily: "AvenirArabic-Heavy",
            }}
          >
            حذف الحساب
          </Button>
        </View>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    width: "50%",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#05595B",
  },
  inactiveTab: {
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
  },
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerTitle: { fontSize: 18, fontFamily: "AvenirArabic-Heavy" },
  profileSection: { alignItems: "center", padding: 20 },
  userName: {
    fontSize: 22,
    fontFamily: "AvenirArabic-Heavy",
    marginVertical: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  activeTab: { borderBottomWidth: 2, borderColor: "#05595B" },
  editProfileSection: { padding: 20 },
  input: { marginBottom: 10 },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#05595B",
  },
});
