import FadeInView from "@/components/FadeInView";
import SplashScreen from "@/components/splash/splash-screen";
import { AuthProvider } from "@/providers/auth-provider";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import OnboardScreen from "./onboard";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  if (!isAppReady) {
    return (
      <SplashScreen
        onFinish={(isCancelled) => !isCancelled && setIsAppReady(true)}
      />
    );
  }

  if (isFirstLaunch) {
    return (
      <FadeInView duration={400}>
        <OnboardScreen
          onFinish={(isCancelled) => setIsFirstLaunch(isCancelled)}
        />
      </FadeInView>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <FadeInView duration={400}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/login/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </FadeInView>
      </AuthProvider>
    </ThemeProvider>
  );
}
