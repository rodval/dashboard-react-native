import FadeInView from "@/components/FadeInView";
import SplashScreen from "@/components/splash/splash-screen";
import { useFirstLaunch } from "@/hooks/use-first-launch";
import { AuthProvider } from "@/providers/auth-provider";
import { Stack } from "expo-router";
import { DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnboardScreen from "./onboard";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isFirstLaunch, completeOnboarding } = useFirstLaunch();

  // También esperamos a saber si es la primera vez, para no mostrar
  // el onboarding un instante y luego saltarlo.
  if (!isAppReady || isFirstLaunch === null) {
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
          onFinish={(isCancelled) => !isCancelled && completeOnboarding()}
        />
      </FadeInView>
    );
  }

  return (
    <SafeAreaProvider>
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
            </Stack>
            <StatusBar style="auto" />
          </FadeInView>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
