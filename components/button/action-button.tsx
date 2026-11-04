import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

export type ActionButtonProps = TouchableOpacityProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  title?: string;
  action?: () => void;
};

export function ActionButton({
  style,
  icon,
  iconColor = "#76b2b5",
  iconSize = 24,
  title,
  action,
}: ActionButtonProps) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={action}>
      {icon ? (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{ paddingVertical: 6 }}
        />
      ) : null}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    borderRadius: 12,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderColor: "#76b2b5",
    borderWidth: 1,
  },
  buttonText: {
    color: "#76b2b5",
    fontSize: 14,
    fontWeight: "600",
  },
});
