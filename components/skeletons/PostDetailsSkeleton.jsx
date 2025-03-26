import { StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const PostDetailsSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.container}>
      {/* Image Carousel Skeleton */}
      <Animated.View style={[styles.imageContainer, { opacity }]} />

      {/* Details Section */}
      <View style={styles.details}>
        {/* Time and Price */}
        <View style={styles.headerRow}>
          <Animated.View style={[styles.timeContainer, { opacity }]} />
          <Animated.View style={[styles.priceContainer, { opacity }]} />
        </View>

        {/* Title and Description */}
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
        <View style={styles.descriptionContainer}>
          <Animated.View style={[styles.descriptionLine, { opacity }]} />
          <Animated.View style={[styles.descriptionLine, { opacity }]} />
          <Animated.View
            style={[styles.descriptionLine, { width: "60%", opacity }]}
          />
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userDetails}>
            <Animated.View style={[styles.avatar, { opacity }]} />
            <View style={styles.userText}>
              <Animated.View style={[styles.usernameSkeleton, { opacity }]} />
              <Animated.View style={[styles.locationSkeleton, { opacity }]} />
            </View>
          </View>
          <Animated.View style={[styles.messageButton, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#E0E0E0",
  },
  details: {
    padding: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  timeContainer: {
    width: 80,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  priceContainer: {
    width: 100,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  titleSkeleton: {
    width: "80%",
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 15,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionLine: {
    width: "100%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  userText: {
    marginLeft: 10,
  },
  usernameSkeleton: {
    width: 120,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  locationSkeleton: {
    width: 150,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  messageButton: {
    width: 120,
    height: 45,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
});

export default PostDetailsSkeleton;
