import { StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const PostSkeleton = () => {
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
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonContent}>
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.skeletonTitle, { opacity }]} />

          <View style={styles.locationTimeRow}>
            <Animated.View style={[styles.skeletonLocation, { opacity }]} />
          </View>

          <View style={styles.userInfoRow}>
            <Animated.View style={[styles.skeletonAvatar, { opacity }]} />
            <Animated.View style={[styles.skeletonUsername, { opacity }]} />
          </View>
        </View>

        <View style={styles.skeletonImageContainer}>
          <Animated.View style={[styles.skeletonImage, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

// Update the styles
const styles = StyleSheet.create({
  skeletonContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    height: 150,
  },
  skeletonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skeletonImageContainer: {
    width: "48%",
    borderRadius: 8,
    overflow: "hidden",
  },
  skeletonImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  contentContainer: {
    width: "48%",
    justifyContent: "space-between",
    padding: 10,
  },
  skeletonTitle: {
    width: "90%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 12,
  },
  locationTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  skeletonLocation: {
    width: "40%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonTime: {
    width: "30%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
  skeletonUsername: {
    width: "50%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default PostSkeleton;
