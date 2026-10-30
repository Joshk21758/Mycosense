import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

function AnimatedTabIcon({ color, focused, activeName, inactiveName }) {
  const [scale] = useState(() => new Animated.Value(focused ? 1 : 0.92));
  const [translateY] = useState(
    () => new Animated.Value(focused ? -2 : 0),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.12 : 0.92,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: focused ? -2 : 0,
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, scale, translateY]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        focused ? styles.iconFocused : styles.iconUnfocused,
        { transform: [{ translateY }, { scale }] },
      ]}
    >
      <Ionicons
        name={focused ? activeName : inactiveName}
        size={focused ? 24 : 23}
        color={color}
      />
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#315F42",
          tabBarInactiveTintColor: "#6b6b6b",
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#F7F7F2",
            height: 72,
            borderTopWidth: 1,
            borderTopColor: "#E9EBE4",
            paddingTop: 6,
            paddingBottom: 5,
          },
          tabBarIconStyle: {
            marginBottom: 1,
            marginTop: -6,
            backgroundColor: "transparent",
            borderRadius: 20,
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: "GoogleSans-SemiBold",
            marginTop: -13,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                color={color}
                focused={focused}
                activeName="stats-chart"
                inactiveName="stats-chart-outline"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                color={color}
                focused={focused}
                activeName="settings"
                inactiveName="settings-outline"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 30,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 15,
  },
  iconFocused: {
    backgroundColor: "#E6EEE3",
  },
  iconUnfocused: {
    backgroundColor: "transparent",
  },
});
