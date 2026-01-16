import { useAuth } from "@/providers/auth-provider";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "../button/custom-button";
import FloatingLabelInputSimple from "../input/simple-input";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = () => {
    console.log("Iniciando sesión con passkey");
  };

  const handleRegister = () => {
    console.log("Navegando a registro");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.welcomeContainer}>
          <Text style={[styles.welcomeText, styles.textColor]}>
            Bienvenido a boxful 🦄
          </Text>
          <Text style={styles.subtitle}>Ingresa tu correo electrónico</Text>
        </View>

        <View style={styles.formContainer}>
          <FloatingLabelInputSimple
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FloatingLabelInputSimple
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            isPassword={true}
            showIcon={true}
          />

          <ThemedView style={[styles.linkContainer, { marginTop: 25 }]}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={handlePasskeyLogin}
            >
              <Image
                source={require("@/assets/boxful/footprint.png")}
                style={styles.footprintIcon}
              />
              <ThemedText type="link" style={styles.textColor}>
                Ingresar con passkey
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <CustomButton
            title={loading ? "Iniciando..." : "Iniciar sesión"}
            action={handleLogin}
            style={styles.loginButton}
            disabled={loading}
          />

          {/* Separador */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>o también</Text>
            <View style={styles.separatorLine} />
          </View>

          <ThemedView style={styles.linkContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <ThemedText type="link" style={styles.textColor}>
                Registrar cuenta
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  textColor: {
    color: "#2E49CE",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4E4C4C",
  },
  formContainer: {
    width: "100%",
  },
  reactLogo: {
    height: 39.9,
    width: 162.48,
    bottom: 0,
    left: 0,
  },
  footprintIcon: {
    height: 18.37,
    width: 23.19,
    bottom: 0,
    left: 0,
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: "#2E49CE",
    height: 60,
    marginTop: 30,
    marginBottom: 15,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  separatorText: {
    marginHorizontal: 16,
    color: "#999",
    fontSize: 14,
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
