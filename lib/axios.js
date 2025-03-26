import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}api/`,
  "Content-Type": "multipart/form-data",
});

const getStoredToken = async () => {
  return await AsyncStorage.getItem("token");
};

instance.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
