import RenderItem from "@/components/render-item";
import { ONBOARDING_DATA, OnboardingStep } from "@/constants/onboarding-data";
import { useCallback, useRef } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function OnboardScreen() {
  const keyStrator = useCallback(
    (item: any, index: number) => index.toString(),
    []
  );

  const scrollRef = useAnimatedRef<FlatList<OnboardingStep>>();
  const xValue = useSharedValue(0);
  const scrollIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      xValue.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstViewable = viewableItems[0];
      if (firstViewable.index !== null && firstViewable.index !== undefined) {
        scrollIndex.value = firstViewable.index ?? 0;
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    minimumViewTime: 300,
    itemVisiblePercentThreshold: 10,
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={scrollRef}
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={keyStrator}
        renderItem={({ index, item }) => (
          <RenderItem index={index} xValue={xValue} item={item} />
        )}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
      />
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
