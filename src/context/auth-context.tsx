import { createContext, useContext } from "react";

// 👤 Tipe user yang login
export interface User {
  id: number;
  username: string;
}

// 🔐 Tipe input untuk login & register
export interface AuthData {
  username: string;
  password: string;
}

// ⚙️ Tipe untuk seluruh context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: AuthData) => Promise<User>;
  login: (data: AuthData) => Promise<User>;
  logout: () => void;
}

// 🧩 Default context (kosong dulu, diisi di AuthProviders)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  register: async () => {
    throw new Error("register function not implemented");
  },
  login: async () => {
    throw new Error("login function not implemented");
  },
  logout: () => {
    throw new Error("logout function not implemented");
  },
});

// 🪄 Custom hook agar mudah digunakan di komponen lain
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
