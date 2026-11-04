import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

export type CustomButtonProps = TouchableOpacityProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  action?: () => void;
};

export function CustomButton({
  style,
  icon,
  title,
  action,
  ...rest
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      {...rest}
      onPress={action}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={24}
          color="#fff"
          style={{ paddingHorizontal: 6 }}
        />
      ) : null}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#76b2b5",
    borderRadius: 12,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
