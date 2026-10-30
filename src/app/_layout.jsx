import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../lib/AuthContext";
import { ThemeProvider } from "../lib/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Pliant-Regular": require("../../assets/fonts/Pliant-Regular.ttf"),
    "Pliant-Bold": require("../../assets/fonts/Pliant-Bold.ttf"),
    "GoogleSans-Regular": require("../../assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-SemiBold": require("../../assets/fonts/GoogleSans-SemiBold.ttf"),
    "GoogleSans-Bold": require("../../assets/fonts/GoogleSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ headerShown: false }} />
          <Stack.Screen name="contact" options={{ headerShown: false }} />
          <Stack.Screen name="newPassword" options={{ headerShown: false }} />
          <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
