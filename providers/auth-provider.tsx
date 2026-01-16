import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  loading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Inicializar sesión y listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Manejar redirección basada en sesión
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";
    const inTabs = segments[0] === "(tabs)";

    if (!session && !inAuthGroup) {
      // No tiene sesión y NO está en auth -> ir a login
      router.replace("/auth/login");
    } else if (session && !inTabs) {
      // Tiene sesión pero está en auth -> ir a tabs
      router.replace("/(tabs)");
    }
  }, [session, segments, loading, router]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error; // Esto es importante para que el catch funcione
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
