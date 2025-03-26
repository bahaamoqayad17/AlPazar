import axios from "axios";

const handleUpload = async (uri) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: `image-${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.path; // Return uploaded image URL
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    return null;
  }
};

export default handleUpload;
