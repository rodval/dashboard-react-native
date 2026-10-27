import { OnboardingStep } from "@/constants/onboarding-data";
import LottieView from "lottie-react-native";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedText } from "../themed-text";

type renderItemProps = {
  index: number;
  xValue: SharedValue<number>;
  item: OnboardingStep;
};

export default function RenderItem({ index, xValue, item }: renderItemProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieSize = SCREEN_WIDTH * 0.9;
  const circleSize = SCREEN_WIDTH;
  const circleRadius = circleSize / 2;

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const lottieAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          xValue.value,
          animationRange,
          [200, 0, -200],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const circleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          xValue.value,
          animationRange,
          [1, 4, 4],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            circleAnimation,
            {
              backgroundColor: item.backgroundColor,
              width: circleSize,
              height: circleSize,
              borderRadius: circleRadius,
            },
          ]}
        />
      </View>

      <Animated.View style={lottieAnimation}>
        <LottieView
          source={item.animation as any}
          autoPlay
          resizeMode="contain"
          loop={true}
          style={[styles.lottie, { width: lottieSize, height: lottieSize }]}
        />
      </Animated.View>

      <ThemedText type="title" style={[styles.textColor]}>
        {item.description}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
  lottie: {
    alignSelf: "center",
  },
  textColor: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  circleContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  circle: {
    position: "absolute",
  },
});
