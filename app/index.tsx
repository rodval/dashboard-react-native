import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import LoginScreen from "./auth/login";

export default function MainScreen() {
  return (
    <ThemedView style={styles.container}>
      <LoginScreen />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
