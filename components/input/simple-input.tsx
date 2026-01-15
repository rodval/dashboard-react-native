// FloatingLabelInputNative.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  isPassword?: boolean;
  showIcon?: boolean;
  iconComponent?: React.ReactNode;
}

const FloatingLabelInputNative: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  isPassword = false,
  showIcon = false,
  iconComponent,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const labelStyle = {
    position: "absolute" as "absolute",
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#007AFF"],
    }),
    backgroundColor: "white",
    paddingHorizontal: 5,
    zIndex: 1,
  };

  // Renderizar ícono personalizado o de password
  const renderIcon = () => {
    if (iconComponent) {
      return iconComponent;
    }

    if (isPassword) {
      return (
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconButton}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      );
    }

    if (showIcon) {
      return (
        <View style={styles.iconButton}>
          <Text style={styles.iconText}>🔍</Text>
        </View>
      );
    }

    return null;
  };

  const shouldShowIcon = isPassword || showIcon || iconComponent;

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            { paddingRight: shouldShowIcon ? 50 : 15 },
          ]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {shouldShowIcon && (
          <View style={styles.iconContainer}>{renderIcon()}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 10,
    zIndex: 2,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 60,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  inputFocused: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    zIndex: 3,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
});

export default FloatingLabelInputNative;
