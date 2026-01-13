import { OnboardingStep } from "@/constants/onboarding-data";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

type renderItemProps = {
  index: number;
  xValue: SharedValue<number>;
  item: OnboardingStep;
};

export default function RenderItem({ index, xValue, item }: renderItemProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
