import splash from "@/assets/lotties/splash.json";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export default function SplashScreen({
  onFinish = (isCancelled) => {},
}: {
  onFinish?: (isCancelled: boolean) => void;
}) {
  return (
    <Animated.View style={styles.container}>
      <LottieView
        source={splash}
        onAnimationFinish={onFinish}
        autoPlay
        resizeMode="contain"
        loop={false}
        style={styles.lottie}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "80%",
    height: "100%",
  },
});
