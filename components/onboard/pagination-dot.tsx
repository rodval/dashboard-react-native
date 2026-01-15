import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type PaginationDotProps = {
  index: number;
  xValue: SharedValue<number>;
  activeColor?: string;
  inactiveColor?: string;
  activeSize?: number;
  inactiveSize?: number;
  dotStyle?: object;
  activeDotStyle?: object;
};

export default function PaginationDot({
  index,
  xValue,
  activeColor = "#fff",
  inactiveColor = "#888",
  activeSize = 30,
  inactiveSize = 8,
  dotStyle = {},
  activeDotStyle = {},
}: PaginationDotProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      xValue.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [activeColor, activeColor, activeColor]
    );

    return { backgroundColor: backgroundColor };
  });

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      xValue.value,
      animationRange,
      [inactiveSize, activeSize, inactiveSize],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      xValue.value,
      animationRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      xValue.value,
      animationRange,
      [0.8, 1.2, 0.8],
      Extrapolation.CLAMP
    );

    return {
      width: width,
      height: 8,
      opacity: opacity,
      transform: [{ scale: withSpring(scale, { damping: 15 }) }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dotContainer,
        animatedColor,
        animatedStyle,
        dotStyle,
        activeDotStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    marginHorizontal: 6,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
