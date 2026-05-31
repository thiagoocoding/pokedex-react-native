/** @format */

import { Pokemon } from "@/types/pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState, useContext } from "react";

type FavoritesContextData = {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
};

const FAVORITES_KEY = "@pokedex:favorites";
const FavoritesContext = createContext({} as FavoritesContextData);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);

      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }

    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(pokemon: Pokemon) {
    setFavorites((prev) => {
      const alreadyFavorite = prev.some((item) => item.name === pokemon.name);

      if (alreadyFavorite) {
        return prev.filter((item) => item.name !== pokemon.name);
      }

      return [...prev, pokemon];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}