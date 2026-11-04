import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";

import { AuthProvider, useAuth } from "../auth-provider";

// --- Mocks ---------------------------------------------------------------

let mockSegments: string[] = [];
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSegments: () => mockSegments,
}));

const mockGetSession = jest.fn();
const mockOnAuthStateChange = jest.fn();
const mockSignInWithPassword = jest.fn();
const mockSignOut = jest.fn();
const mockUnsubscribe = jest.fn();

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
      onAuthStateChange: (...args: unknown[]) => mockOnAuthStateChange(...args),
      signInWithPassword: (...args: unknown[]) =>
        mockSignInWithPassword(...args),
      signOut: (...args: unknown[]) => mockSignOut(...args),
    },
  },
}));

// --- Helpers -------------------------------------------------------------

const fakeSession = { user: { email: "real@example.com" } };

function Consumer() {
  const { session, loading } = useAuth();
  return (
    <>
      <Text testID="loading">{String(loading)}</Text>
      <Text testID="email">{session?.user.email ?? "none"}</Text>
    </>
  );
}

/** Renderiza el provider y devuelve el contexto para llamar signIn/signOut. */
async function renderWithProvider() {
  let auth!: ReturnType<typeof useAuth>;
  function Grab() {
    auth = useAuth();
    return null;
  }

  const result = await render(
    <AuthProvider>
      <Consumer />
      <Grab />
    </AuthProvider>,
  );
  // Deja resolver la promesa de getSession y los efectos de redirección
  await act(async () => {});

  return { ...result, auth: () => auth };
}

/** Simula un evento de Supabase (login, logout, refresh) desde el listener. */
async function emitAuthChange(session: unknown) {
  const listener = mockOnAuthStateChange.mock.calls[0][0];
  await act(async () => {
    listener("SIGNED_IN", session);
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSegments = [];
  mockGetSession.mockResolvedValue({ data: { session: null } });
  mockOnAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: mockUnsubscribe } },
  });
  mockSignInWithPassword.mockResolvedValue({ error: null });
  mockSignOut.mockResolvedValue({ error: null });
});

// --- Tests ---------------------------------------------------------------

describe("AuthProvider: carga inicial", () => {
  it("empieza cargando y termina al resolver getSession", async () => {
    let resolveSession!: (value: unknown) => void;
    mockGetSession.mockReturnValue(
      new Promise((resolve) => {
        resolveSession = resolve;
      }),
    );

    await render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(mockReplace).not.toHaveBeenCalled();

    await act(async () => {
      resolveSession({ data: { session: fakeSession } });
    });
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("email")).toHaveTextContent("real@example.com");
  });

  it("se suscribe a los cambios de sesión de Supabase", async () => {
    await renderWithProvider();

    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1);
  });

  it("cancela la suscripción al desmontar", async () => {
    const { unmount } = await renderWithProvider();
    await unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});

describe("AuthProvider: redirecciones", () => {
  it("manda al login cuando no hay sesión", async () => {
    mockSegments = ["(tabs)"];
    await renderWithProvider();

    expect(screen.getByTestId("email")).toHaveTextContent("none");
    expect(mockReplace).toHaveBeenCalledWith("/auth/login");
  });

  it("no redirige si ya está en el login sin sesión", async () => {
    mockSegments = ["auth", "login"];
    await renderWithProvider();

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("manda a las pestañas cuando hay sesión y está en el login", async () => {
    mockSegments = ["auth", "login"];
    mockGetSession.mockResolvedValue({ data: { session: fakeSession } });
    await renderWithProvider();

    expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
  });

  it("no redirige si tiene sesión y ya está en las pestañas", async () => {
    mockSegments = ["(tabs)", "history"];
    mockGetSession.mockResolvedValue({ data: { session: fakeSession } });
    await renderWithProvider();

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("al iniciar sesión desde el login, manda a las pestañas", async () => {
    mockSegments = ["auth", "login"];
    await renderWithProvider();
    expect(mockReplace).not.toHaveBeenCalled();

    await emitAuthChange(fakeSession);

    expect(screen.getByTestId("email")).toHaveTextContent("real@example.com");
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
  });

  it("al cerrar sesión desde las pestañas, manda al login", async () => {
    mockSegments = ["(tabs)"];
    mockGetSession.mockResolvedValue({ data: { session: fakeSession } });
    await renderWithProvider();
    expect(mockReplace).not.toHaveBeenCalled();

    await emitAuthChange(null);

    expect(screen.getByTestId("email")).toHaveTextContent("none");
    expect(mockReplace).toHaveBeenCalledWith("/auth/login");
  });
});

describe("AuthProvider: signIn", () => {
  it("llama a Supabase con email y contraseña", async () => {
    const { auth } = await renderWithProvider();

    await act(() => auth().signIn("a@b.com", "secret"));

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "secret",
    });
  });

  it("propaga el error de Supabase", async () => {
    const error = new Error("Invalid login credentials");
    mockSignInWithPassword.mockResolvedValue({ error });
    const { auth } = await renderWithProvider();

    await expect(auth().signIn("a@b.com", "bad")).rejects.toBe(error);
  });
});

describe("AuthProvider: signOut", () => {
  it("llama a Supabase", async () => {
    const { auth } = await renderWithProvider();

    await act(() => auth().signOut());

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("propaga el error de Supabase", async () => {
    const error = new Error("Network request failed");
    mockSignOut.mockResolvedValue({ error });
    const { auth } = await renderWithProvider();

    await expect(auth().signOut()).rejects.toBe(error);
  });
});

describe("useAuth fuera del provider", () => {
  it("devuelve el contexto por defecto", async () => {
    await render(<Consumer />);

    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("email")).toHaveTextContent("none");
  });
});
