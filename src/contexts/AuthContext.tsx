import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../database/client";

interface User {
  id: string;
  email: string;
}

interface Permission {
  name: string;
  actions: string[];
}

interface Permissions {
  services: Permission[];
}

interface Role {
  name: string;
  permissions: Permissions;
}

interface UserMeta {
  id?: number;
  user_id?: string;
  roles?: string[];
  settings?: Record<string, any>;
  permissions?: Permissions;
}

interface AuthContextType {
  user: User | null;
  isAllowed: (service: string, action: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userMeta, setUserMeta] = useState<UserMeta | null>({
    roles: ["customer"],
    settings: {
      theme: "light",
      fontSize: "medium",
      language: "en",
      currency: "usd",
      timezone: "UTC",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      }: any = await db.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();

    const fetchRoles = async () => {
      const { data: roles, error: rolesError }: any = await db
        .from("roles")
        .select("*");
      if (rolesError) throw new Error(rolesError.message);
      setRoles(roles);
    };

    fetchRoles();

    const fetchUserMeta = async (user: User) => {
      const { data: userMetaData, error: userMetaError }: any = await db
        .from("user_meta")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (userMetaError) {
        throw new Error(userMetaError.message);
      }

      if (userMetaData) setUserMeta(userMetaData);
    };

    const { data: authListener } = db.auth.onAuthStateChange(
      (_: any, session: any) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserMeta(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error }: any = await db.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    setUser(data.user);
  };

  const register = async (email: string, password: string) => {
    const { data, error }: any = await db.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    setUser(data.user);

    const { data: _userMetaData, error: userMetaError }: any = await db
      .from("user_meta")
      .insert({
        user_id: data.user.id,
        roles: ["customer"],
        settings: {
          theme: "light",
          fontSize: "medium",
          language: "en",
          currency: "usd",
          timezone: "UTC",
        },
        permissions: {
          services: [],
        },
      });
    if (userMetaError) throw new Error(userMetaError.message);
  };

  const logout = async () => {
    await db.auth.signOut();
    setUser(null);
  };

  const isAllowed = (service: string, action: string) => {
    const userRoles = roles.filter((role: Role) =>
      userMeta?.roles?.includes(role.name)
    );
    const allowed: boolean =
      userRoles.some((role: Role) =>
        role.permissions.services.some(
          (s: Permission) => s.name === service && s.actions.includes(action)
        )
      ) || false;
    const allowed2: boolean =
      userMeta?.permissions?.services.some(
        (s: Permission) => s.name === service && s.actions.includes(action)
      ) || false;
    return allowed || allowed2;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAllowed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
