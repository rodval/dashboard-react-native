import { ActionButton } from "@/components/button/action-button";
import { CustomButton } from "@/components/button/custom-button";
import { ThemedText } from "@/components/themed-text";
import { RECENT_SHIPMENTS } from "@/constants/mock-recent-orders-data";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.textColor}>
          ¡Hola mundo!
        </ThemedText>

        <View style={styles.headerRight}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <Image
            source={require("@/assets/custom/menu.png")}
            style={styles.menuIcon}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText
          type="title"
          style={[styles.textColor, styles.greetingMessage]}
        >
          ¿Qué necesitas hacer?
        </ThemedText>

        <View style={styles.actionsContainer}>
          <CustomButton
            icon="add-circle-outline"
            title="Hacer envío"
            action={() => {}}
          />

          <View style={styles.quickActionsContainer}>
            <ActionButton
              icon="calculator-outline"
              title="Test"
              action={() => {}}
            />
            <ActionButton 
              icon="cube-outline" 
              title="Test" 
              action={() => {}} 
            />
            <ActionButton
              icon="pricetag-outline"
              title="Test"
              action={() => {}}
            />
            <ActionButton
              icon="help-circle-outline"
              title="Test"
              action={() => {}}
            />
          </View>
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require("@/assets/custom/home-banner.jpeg")}
            style={styles.banner}
          />
        </View>

        <View style={styles.recentShipmentsContainer}>
          <ThemedText
            type="subtitle"
            style={[styles.textColor, { marginBottom: 20 }]}
          >
            Envíos recientes
          </ThemedText>

          {RECENT_SHIPMENTS.map((shipment) => (
            <View key={shipment.id} style={styles.shipmentCard}>
              <View style={styles.shipmentsIcon}>
                <Ionicons name="cube-outline" size={28} color="rgb(92,68,60)" />
              </View>
              <View style={styles.shipmentInfo}>
                <ThemedText type="caption" style={styles.shipmentLabel}>
                  Destinatario
                </ThemedText>
                <ThemedText type="caption" style={styles.shipmentRecipient}>
                  {shipment.recipient}
                </ThemedText>
              </View>
              <View style={styles.statusBadge}>
                <Text style={[styles.statusText, { color: shipment.color }]}>
                  {shipment.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  banner: {
    flex: 1,
    height: 151,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  textColor: {
    color: "#141F58",
  },
  greetingMessage: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    textAlign: "center",
  },
  menuIcon: {
    height: 18.37,
    width: 23.19,
    bottom: 0,
    left: 0,
  },
  actionsContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingTop: 15,
  },
  recentShipmentsContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#F3EEEC",
    borderRadius: 12,
  },
  shipmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  shipmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: "#D0B9B3",
    borderWidth: 1,
  },
  shipmentsIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#E8DCD9",
    justifyContent: "center",
    alignItems: "center",
  },
  shipmentLabel: {
    color: "#666",
    marginBottom: 4,
  },
  shipmentRecipient: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
