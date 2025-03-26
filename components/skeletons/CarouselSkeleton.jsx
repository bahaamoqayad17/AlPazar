import { StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const CarouselSkeleton = () => {
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
      <Animated.View style={[styles.banner, { opacity }]}>
        <View style={styles.contentOverlay}>
          <Animated.View style={[styles.titleSkeleton, { opacity }]} />
          <Animated.View style={[styles.buttonSkeleton, { opacity }]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  banner: {
    height: 150,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
  contentOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleSkeleton: {
    height: 30,
    width: "70%",
    backgroundColor: "#D0D0D0",
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonSkeleton: {
    height: 35,
    width: 120,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
  },
});

export default CarouselSkeleton;
