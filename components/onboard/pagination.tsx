import { OnboardingStep } from "@/constants/onboarding-data";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import PaginationDot from "./pagination-dot";

type PaginationProps = {
  data: OnboardingStep[];
  scrollIndex: SharedValue<number>;
  dotColor?: string;
  activeDotColor?: string;
  dotsize?: number;
  activeDotSize?: number;
  containerStyle?: object;
};

export default function Pagination({
  data,
  scrollIndex,
  dotColor = "#888",
  activeDotColor = "#fff",
  dotsize = 20,
  activeDotSize = 22,
  containerStyle = {},
}: PaginationProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((_, index) => (
        <PaginationDot
          key={index.toString()}
          index={index}
          xValue={scrollIndex}
          inactiveColor={dotColor}
          activeColor={activeDotColor}
          inactiveSize={dotsize}
          activeSize={activeDotSize}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
});
