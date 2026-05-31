/** @format */

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.86);
  const rotate = useSharedValue(-4);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 650 });
    scale.value = withSequence(
      withSpring(1.08, { damping: 8, stiffness: 120 }),
      withRepeat(
        withSequence(
          withTiming(1.02, {
            duration: 650,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1.08, {
            duration: 650,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      ),
    );
    rotate.value = withSequence(
      withTiming(4, { duration: 500, easing: Easing.out(Easing.ease) }),
      withRepeat(
        withSequence(
          withTiming(-3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          withTiming(3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );

    const timeout = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [opacity, rotate, scale]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      <View style={styles.content}>
        <Animated.View style={[styles.logoWrapper, logoStyle]}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode='contain'
          />
        </Animated.View>

        <Text style={styles.title}>Pok{"\u00e9"}dex</Text>
        <Text style={styles.subtitle}>powered by @thiagocoding</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoWrapper: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF5350",
  },
});
