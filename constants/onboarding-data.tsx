import { AnimationObject } from "react-native-reanimated";

export interface OnboardingStep {
  key: string;
  animation: AnimationObject;
}

export const ONBOARDING_DATA: OnboardingStep[] = [
  {
    key: "step-1",
    animation: require("@/assets/boxful/onboarding1.json"),
  },
  {
    key: "step-2",
    animation: require("@/assets/boxful/onboarding2.json"),
  },
  {
    key: "step-3",
    animation: require("@/assets/boxful/onboarding3.json"),
  },
];
