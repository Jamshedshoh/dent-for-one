import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../database/client";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } }: any = await db.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();

    const { data: authListener } = db.auth.onAuthStateChange((_: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error }: any = await db.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    setUser(data.user);
  };

  const register = async (email: string, password: string) => {
    const { data, error }: any = await db.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    setUser(data.user);
  };

  const logout = async () => {
    await db.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
