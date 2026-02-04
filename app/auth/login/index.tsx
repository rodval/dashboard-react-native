import LoginForm from "@/components/form/login-form";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={15} tint="dark" style={styles.blurContainer}>
        <View style={styles.brandContainer}>
          <Image
            source={require("@/assets/boxful/logo.png")}
            style={styles.reactLogo}
          />
        </View>
      </BlurView>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blurContainer: {
    paddingTop: 24,
    paddingBottom: 150,
    justifyContent: "flex-start",
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  reactLogo: {
    height: 39.9,
    width: 162.48,
    bottom: 0,
    left: 0,
  },
  formContainer: {
    flex: 2,
    flexDirection: "column",
    paddingHorizontal: 24,
    alignContent: "center",
    justifyContent: "flex-end",
  },
});
