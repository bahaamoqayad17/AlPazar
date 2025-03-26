import { useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Next from "../icons/next";
import Prev from "../icons/prev";

const { width: screenWidth } = Dimensions.get("window");

const ImageCarousel = ({ images }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Scroll Event to Update Active Dot
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  // Move to Next Image
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  // Move to Previous Image
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}${image}`,
            }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View
        style={{
          width: "30%",
          position: "absolute",
          bottom: 15,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.button,
            styles.nextButton,
            currentIndex === images.length - 1 && styles.disabledButton,
          ]}
          disabled={currentIndex === images.length - 1}
        >
          <Prev />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePrev}
          style={[
            styles.button,
            styles.prevButton,
            currentIndex === 0 && styles.disabledButton,
          ]}
          disabled={currentIndex === 0}
        >
          <Next />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  scrollView: {
    width: screenWidth,
  },
  image: {
    width: screenWidth,
    height: 250,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Add slight shadow effect
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ImageCarousel;
