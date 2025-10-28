import React, { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { hashPassword, loadUsers, saveUsers } from "@/libs/utils";

// Tipe data user
interface User {
  id: number;
  username: string;
  passwordHash?: string; // disimpan di localStorage, tapi tidak di state aktif
}

interface AuthData {
  username: string;
  password: string;
}

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("dummy_current_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Simpan user aktif ke localStorage setiap berubah
  useEffect(() => {
    localStorage.setItem("dummy_current_user", JSON.stringify(user || null));
  }, [user]);

  // 🔹 Register
  const register = async ({ username, password }: AuthData) => {
    setLoading(true);
    const users = loadUsers() as User[];

    if (users.find((u) => u.username === username)) {
      setLoading(false);
      throw new Error("Username sudah terdaftar");
    }

    const pwdHash = await hashPassword(password);
    const newUser: User = { id: Date.now(), username, passwordHash: pwdHash };

    users.push(newUser);
    saveUsers(users);

    // Simpan user yang baru login (tanpa password)
    setUser({ id: newUser.id, username: newUser.username });
    setLoading(false);
    return newUser;
  };

  // 🔹 Login
  const login = async ({ username, password }: AuthData) => {
    setLoading(true);
    const users = loadUsers() as User[];
    const pwdHash = await hashPassword(password);
    const found = users.find(
      (u) => u.username === username && u.passwordHash === pwdHash
    );
    setLoading(false);

    if (!found) throw new Error("Username atau password salah");

    setUser({ id: found.id, username: found.username });
    return found;
  };

  // 🔹 Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
