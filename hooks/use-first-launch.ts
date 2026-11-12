import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export const ONBOARDING_SEEN_KEY = "onboarding:seen";

/**
 * Indica si es la primera vez que se abre la app, persistiendo el resultado
 * en AsyncStorage para que el onboarding solo se muestre una vez.
 *
 * `isFirstLaunch` es `null` mientras se lee el almacenamiento.
 */
export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(ONBOARDING_SEEN_KEY)
      .then((value) => active && setIsFirstLaunch(value === null))
      // Si el almacenamiento falla, es mejor mostrar el onboarding de nuevo
      // que bloquear la app.
      .catch(() => active && setIsFirstLaunch(true));
    return () => {
      active = false;
    };
  }, []);

  const completeOnboarding = useCallback(async () => {
    setIsFirstLaunch(false);
    try {
      await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, "true");
    } catch {
      // No persistir no es crítico: se verá el onboarding en el próximo arranque.
    }
  }, []);

  return { isFirstLaunch, completeOnboarding };
}
