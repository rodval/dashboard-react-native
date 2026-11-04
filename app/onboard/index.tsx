import { ActionButton } from "@/components/button/action-button";
import Pagination from "@/components/onboard/pagination";
import RenderItem from "@/components/onboard/render-item";
import { ONBOARDING_DATA, OnboardingStep } from "@/constants/onboarding-data";
import { useCallback } from "react";
import { FlatList, StyleSheet, View, type ListViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  itemVisiblePercentThreshold: 10,
};

export default function OnboardScreen({
  onFinish = (isCancelled) => {},
}: {
  onFinish?: (isCancelled: boolean) => void;
}) {
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
    ({ viewableItems }: { viewableItems: ListViewToken[] }) => {
      const firstViewable = viewableItems[0];
      if (firstViewable?.index != null) {
        scrollIndex.set(firstViewable.index);
      }
    },
    [scrollIndex]
  );

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const isLastItem = scrollIndex.value === ONBOARDING_DATA.length - 1;
    return {
      opacity: withTiming(isLastItem ? 1 : 0, { duration: 300 }),
      transform: [
        {
          scale: withTiming(isLastItem ? 1 : 0.5, { duration: 300 }),
        },
      ],
    };
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
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
      <View style={styles.paginationBottom}>
        <Pagination data={ONBOARDING_DATA} scrollIndex={xValue} />
        <Animated.View style={buttonAnimatedStyle}>
          <ActionButton
            icon="arrow-forward-circle-outline"
            iconColor="#fff"
            iconSize={60}
            action={() => {
              onFinish(false);
            }}
            style={styles.continueButton}
          />
        </Animated.View>
      </View>
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
  paginationBottom: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  continueButton: {
    borderWidth: 0,
    padding: 0,
  },
});
