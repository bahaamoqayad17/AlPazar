import { StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const PostGridSkeleton = ({ opacity }) => {
  return (
    <View style={styles.postItem}>
      <Animated.View style={[styles.postImage, { opacity }]} />
      <Animated.View style={[styles.postTitle, { opacity }]} />
    </View>
  );
};

const ProfileSkeleton = () => {
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
      {/* Title Skeleton */}
      <View style={styles.header}>
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Avatar Skeleton */}
        <View style={styles.avatarContainer}>
          <Animated.View style={[styles.avatarSkeleton, { opacity }]} />
        </View>

        {/* User Info Skeletons */}
        <Animated.View style={[styles.nameSkeleton, { opacity }]} />
        <Animated.View style={[styles.contactSkeleton, { opacity }]} />
        <Animated.View style={[styles.locationSkeleton, { opacity }]} />
      </View>

      {/* Tabs Skeleton */}
      <View style={styles.tabsContainer}>
        <Animated.View style={[styles.tabSkeleton, { opacity }]} />
      </View>

      {/* Posts Grid Skeleton */}
      <View style={styles.postsContainer}>
        <View>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <PostGridSkeleton key={item} opacity={opacity} />
          ))}
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
  header: {
    padding: 20,
    alignItems: "center",
  },
  titleSkeleton: {
    width: 150,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatarSkeleton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E0E0E0",
  },
  nameSkeleton: {
    width: 180,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginVertical: 8,
  },
  contactSkeleton: {
    width: 220,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginVertical: 8,
  },
  locationSkeleton: {
    width: 140,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginVertical: 8,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tabSkeleton: {
    width: "100%",
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 20,
  },
  postsContainer: {
    padding: 10,
  },
  postItem: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  postImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    width: "80%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default ProfileSkeleton;
