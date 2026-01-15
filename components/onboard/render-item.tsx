import { OnboardingStep } from "@/constants/onboarding-data";
import LottieView from "lottie-react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

type renderItemProps = {
  index: number;
  xValue: SharedValue<number>;
  item: OnboardingStep;
};

export default function RenderItem({ index, xValue, item }: renderItemProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieSize = SCREEN_WIDTH;

  return (
    <Animated.View style={styles.container}>
      <LottieView
        source={item.animation as any}
        autoPlay
        resizeMode="cover"
        loop={false}
        style={[styles.lottie, { width: lottieSize, height: lottieSize }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    alignSelf: "center",
    flex: 1,
    width: "100%",
  },
});
