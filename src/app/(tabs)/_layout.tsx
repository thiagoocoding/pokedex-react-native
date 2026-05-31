/** @format */

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: "Pok\u00e9dex",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: "Sobre",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='information-circle' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
