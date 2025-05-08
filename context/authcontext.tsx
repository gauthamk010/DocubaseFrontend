import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    AsyncStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    setIsUser(false);
    setIsAdmin(false);
    setIsModerator(false);
    setIsAuthenticated(false);
    setToken(null);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = JSON.parse(atob(token.split(".")[1]));
        const exp = decodedUser.exp * 1000;

        if (Date.now() >= exp) {
          logout();
        } else {
          setIsAuthenticated(true);
          if (decodedUser.roles === "admin") {
            setIsAdmin(true);
          } else if (decodedUser.roles === "student") {
            setIsUser(true);
          } else if (decodedUser.roles === "moderator") {
            setIsModerator(true);
          }
        }
      } catch (error) {
        console.error("Invalid token format", error);
        logout();
      }
    }
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, isModerator, isUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
