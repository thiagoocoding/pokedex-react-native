/** @format */

import { useFavorites } from "@/context/FavoritesContext";
import { router } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={3}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const id = item.url.split("/")[6];

          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/pokemon/[id]",
                  params: { id },
                })
              }>
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
    </View>
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
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },

  name: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  row: {
    gap: 12,
  },
  image: {
    height: 90,
    width: 90,
  },
});
