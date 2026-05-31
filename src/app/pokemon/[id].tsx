/** @format */

import {
  statTranslations,
  typeTranslations,
} from "@/constants/pokemonTranslations";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../services/api";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();
  const pokemonId = Array.isArray(id) ? id[0] : id;
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (!pokemonId) {
      return;
    }

    async function loadPokemon() {
      const response = await api.get(`/pokemon/${pokemonId}`);
      setPokemon(response.data);
    }

    loadPokemon();
  }, [pokemonId]);

  if (!pokemon) {
    return <PokeBallLoading />;
  }

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.name}>{pokemon.name}</Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map((item: any) => (
            <Text key={item.slot} style={styles.typeBadge}>
              {typeTranslations[item.type.name] ?? item.type.name}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações</Text>

          <Text style={styles.info}>
            Altura: {(pokemon.height / 10).toFixed(1)} m
          </Text>

          <Text style={styles.info}>
            Peso: {(pokemon.weight / 10).toFixed(1)} kg
          </Text>

          <Text style={styles.info}>
            Experiência Base: {pokemon.base_experience}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>

          {pokemon.stats.map((item: any) => (
            <View key={item.stat.name} style={styles.statRow}>
              <Text style={styles.statName}>
                {statTranslations[item.stat.name] ?? item.stat.name}
              </Text>

              <Text style={styles.statValue}>{item.base_stat}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PokeBallLoading() {
  const [rotateAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.loadingContainer}>
      <Animated.View
        style={[
          styles.pokeball,
          {
            transform: [{ rotate: spin }, { scale: pulseAnim }],
          },
        ]}>
        <View style={styles.pokeballTop} />
        <View style={styles.pokeballLine} />
        <View style={styles.pokeballCenter} />
        <View style={styles.pokeballBottom} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  pokeball: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 4,
    borderColor: "#222",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },

  pokeballTop: {
    flex: 1,
    backgroundColor: "#EF5350",
  },

  pokeballLine: {
    position: "absolute",
    top: 39,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "#222",
  },

  pokeballCenter: {
    position: "absolute",
    top: 26,
    left: 26,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 5,
    borderColor: "#222",
    backgroundColor: "#FFF",
    zIndex: 1,
  },

  pokeballBottom: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  image: {
    width: 220,
    height: 220,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 12,
  },

  typesContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  typeBadge: {
    backgroundColor: "#EF5350",
    color: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  info: {
    fontSize: 16,
    marginBottom: 8,
    textTransform: "capitalize",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  statName: {
    fontSize: 15,
    fontWeight: "600",
  },

  statValue: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
