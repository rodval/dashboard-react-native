import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type FadeInViewProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
};

export default function FadeInView({
  children,
  duration = 500,
  delay = 0,
}: FadeInViewProps) {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [opacity, duration, delay]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
