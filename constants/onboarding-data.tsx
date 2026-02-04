import { AnimationObject } from "react-native-reanimated";

export interface OnboardingStep {
  key: string;
  animation: AnimationObject;
  description: string;
  backgroundColor?: string;
}

export const ONBOARDING_DATA: OnboardingStep[] = [
  {
    key: "step-1",
    animation: require("@/assets/lotties/designer.json"),
    description: "Descubre y gestiona tus envíos de manera eficiente.",
    backgroundColor: "#FFB7B2",
  },
  {
    key: "step-2",
    animation: require("@/assets/lotties/doctor.json"),
    description:
      "Recibe notificaciones en tiempo real sobre el estado de tus envíos.",
    backgroundColor: "#A7C7E7",
  },
  {
    key: "step-3",
    animation: require("@/assets/lotties/inspector.json"),
    description: "Accede a soporte y ayuda cuando lo necesites.",
    backgroundColor: "#C7CEEA",
  },
];
