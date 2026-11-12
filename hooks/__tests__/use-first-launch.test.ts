import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { ONBOARDING_SEEN_KEY, useFirstLaunch } from "@/hooks/use-first-launch";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
});

describe("useFirstLaunch", () => {
  it("es primera vez cuando no se ha visto el onboarding", async () => {
    const { result } = await renderHook(() => useFirstLaunch());

    await waitFor(() => expect(result.current.isFirstLaunch).toBe(true));
  });

  it("no es primera vez cuando el onboarding ya se vio", async () => {
    await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, "true");
    const { result } = await renderHook(() => useFirstLaunch());

    await waitFor(() => expect(result.current.isFirstLaunch).toBe(false));
  });

  it("al completar el onboarding lo persiste", async () => {
    const { result } = await renderHook(() => useFirstLaunch());
    await waitFor(() => expect(result.current.isFirstLaunch).toBe(true));

    await act(() => result.current.completeOnboarding());

    expect(result.current.isFirstLaunch).toBe(false);
    expect(await AsyncStorage.getItem(ONBOARDING_SEEN_KEY)).toBe("true");
  });

  it("muestra el onboarding si falla la lectura", async () => {
    jest
      .mocked(AsyncStorage.getItem)
      .mockRejectedValueOnce(new Error("storage unavailable"));
    const { result } = await renderHook(() => useFirstLaunch());

    await waitFor(() => expect(result.current.isFirstLaunch).toBe(true));
  });
});
