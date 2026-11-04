import { useAuth } from "@/providers/auth-provider";
import { Image } from "expo-image";
import { useState } from "react";
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
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.subtitle}>Lorem ipsum dolor sit amet</Text>
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

          <View style={styles.passkeyRow}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={handlePasskeyLogin}
            >
              <Image
                source={require("@/assets/icons/footprint.png")}
                style={styles.footprintIcon}
              />
              <Text style={styles.linkText}>Ingresar con passkey</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={loading ? "Iniciando..." : "Iniciar sesión"}
            action={handleLogin}
            style={styles.loginButton}
            disabled={loading}
          />

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>o también</Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.registerRow}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.linkText}>Registrar cuenta</Text>
            </TouchableOpacity>
          </View>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F1C3F",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A8A9A",
  },
  formContainer: {
    width: "100%",
  },
  footprintIcon: {
    height: 18,
    width: 22,
    marginRight: 8,
  },
  passkeyRow: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#2E49CE",
    height: 56,
    marginTop: 28,
    marginBottom: 12,
    borderRadius: 14,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EBEBF0",
  },
  separatorText: {
    marginHorizontal: 16,
    color: "#AFAFBF",
    fontSize: 13,
  },
  registerRow: {
    alignItems: "center",
  },
  linkText: {
    color: "#2E49CE",
    fontSize: 14,
    fontWeight: "500",
  },
});
