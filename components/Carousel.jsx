import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const AutoCarousel = ({ sliders }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= data.length) {
          nextIndex = 0;
        }
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth * 0.9,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = async (url) => {
    if (url) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("Cannot open URL: " + url);
        }
      } catch (error) {
        console.error("An error occurred while opening the URL:", error);
      }
    }
  };

  return (
    <Card style={styles.card}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ height: 180 }}
      >
        {sliders?.map((item) => (
          <View key={item.id} style={styles.slide}>
            <ImageBackground
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}${item?.image}`,
              }}
              style={styles.imageBackground}
              imageStyle={styles.image}
            >
              <View style={styles.overlay}>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Pressable
                    onPress={() => handlePress(item.link)}
                    style={styles.customButton}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>رؤية المزيد</Text>
                      <Ionicons name="arrow-back" size={20} color={"#05595B"} />
                    </View>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default AutoCarousel;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    margin: 20,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    padding: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  slide: {
    width: screenWidth * 0.9,
    height: 180,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "80%",
  },
  title: {
    fontSize: 18,
    fontFamily: "AvenirArabic-Medium",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  discount: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Medium",
    color: "#E2D784",
    textAlign: "center",
    marginBottom: 20,
  },
  customButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#E2D784",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#05595B",
    fontSize: 14,
    marginRight: 8,
    fontFamily: "AvenirArabic-Medium",
  },
});
