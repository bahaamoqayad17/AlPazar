import { StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const MessageSkeleton = () => {
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
      <View style={styles.messageContainer}>
        <Animated.View style={[styles.avatarSkeleton, { opacity }]} />
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.nameSkeleton, { opacity }]} />
          <Animated.View style={[styles.messageSkeleton, { opacity }]} />
        </View>
      </View>
      <Animated.View style={[styles.dividerSkeleton, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  timeContainer: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  timeSkeleton: {
    width: 60,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  nameSkeleton: {
    width: "30%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  messageSkeleton: {
    width: "80%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  dividerSkeleton: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 10,
  },
});

export default MessageSkeleton;
