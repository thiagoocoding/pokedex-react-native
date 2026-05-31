/** @format */

import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style='dark' />
      <Stack screenOptions={{ headerShown: false }} />
    </FavoritesProvider>
  );
}
