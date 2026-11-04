import { render, screen } from "@testing-library/react-native";

import HomeScreen from "@/app/(tabs)/index";
import { RECENT_SHIPMENTS } from "@/constants/mock-recent-orders-data";

// Test Renderer solo expone elementos nativos, así que para revisar las props
// del SafeAreaView lo reemplazamos por un View que guarda lo que recibe.
const mockSafeAreaProps = jest.fn();
jest.mock("react-native-safe-area-context", () => {
  const { View } = jest.requireActual("react-native");
  return {
    ...jest.requireActual("react-native-safe-area-context"),
    SafeAreaView: (props: Record<string, unknown>) => {
      mockSafeAreaProps(props);
      return <View {...props} />;
    },
  };
});

beforeEach(() => {
  mockSafeAreaProps.mockClear();
});

describe("HomeScreen", () => {
  it("muestra el saludo y las acciones principales", async () => {
    await render(<HomeScreen />);

    expect(screen.getByText("¡Hola mundo!")).toBeOnTheScreen();
    expect(screen.getByText("¿Qué necesitas hacer?")).toBeOnTheScreen();
    expect(screen.getByText("Hacer envío")).toBeOnTheScreen();
  });

  it("muestra una tarjeta por cada envío reciente", async () => {
    await render(<HomeScreen />);

    expect(screen.getByText("Envíos recientes")).toBeOnTheScreen();
    expect(screen.getAllByText("Destinatario")).toHaveLength(
      RECENT_SHIPMENTS.length,
    );
    for (const shipment of RECENT_SHIPMENTS) {
      expect(screen.getByText(shipment.status)).toBeOnTheScreen();
    }
  });

  it("no aplica el inset inferior para no chocar con la tab bar", async () => {
    await render(<HomeScreen />);

    expect(mockSafeAreaProps).toHaveBeenCalledWith(
      expect.objectContaining({ edges: ["top", "left", "right"] }),
    );
  });
});
