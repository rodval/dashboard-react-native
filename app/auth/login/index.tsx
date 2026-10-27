import LoginForm from "@/components/form/login-form";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Hero background */}
      <View style={styles.hero}>
        {/* Decorative circles */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <SafeAreaView style={styles.heroContent}>
          <Image
            source={require("@/assets/custom/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </SafeAreaView>
      </View>

      {/* Floating form card */}
      <View style={styles.card}>
        <View style={styles.cardHandle} />
        <LoginForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1C3F",
  },
  hero: {
    height: height * 0.42,
    backgroundColor: "#0F1C3F",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circleTopRight: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#2E49CE",
    opacity: 0.25,
    top: -60,
    right: -60,
  },
  circleBottomLeft: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#2E49CE",
    opacity: 0.15,
    bottom: 20,
    left: -50,
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 52,
    width: 210,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    marginTop: -24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  cardHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },
});
