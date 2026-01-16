import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

export default function AccountScreen() {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const handleLogOut = async () => {
    setLoading(true);

    try {
      await signOut();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.linkContainer}>
      <TouchableOpacity onPress={handleLogOut} disabled={loading}>
        <ThemedText type="link">Cerrar sesión</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#3128dd",
  },
});
