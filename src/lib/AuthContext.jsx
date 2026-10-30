import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // check for the token on app launch
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.log("Tokenization error!", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, logout, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
