/** @format */

import { useFavorites } from "@/context/FavoritesContext";
import { Pokemon } from "@/types/pokemon";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../services/api";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function carregar() {
      const response = await api.get("/pokemon?limit=1302");
      setPokemons(response.data.results);
    }

    carregar();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPokemons}
        numColumns={3}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Pokédex</Text>

            <TextInput
              style={styles.input}
              placeholder='Buscar Pokémon...'
              value={search}
              onChangeText={setSearch}
            />
          </>
        }
        renderItem={({ item }) => {
          const id = item.url.split("/")[6];
          const isFavorite = favorites.some(
            (pokemon) => pokemon.name === item.name,
          );

          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/pokemon/[id]",
                  params: { id },
                })
              }>
              <Pressable onPress={() => toggleFavorite(item)}>
                <Ionicons
                  name={isFavorite ? "star" : "star-outline"}
                  size={24}
                  color={isFavorite ? "#FFD700" : "#999"}
                />
              </Pressable>
              <Image
                style={styles.image}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                }}
              />

              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  list: {
    padding: 16,
  },

  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  name: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },

  row: {
    gap: 12,
  },

  image: {
    height: 90,
    width: 90,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
});
