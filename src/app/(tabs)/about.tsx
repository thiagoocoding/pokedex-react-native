/** @format */

import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const githubUrl = "https://github.com/thiagoocoding";
const repositoryUrl = "https://github.com/thiagoocoding/pokedex-react-native";

export default function About() {
  function openLink(url: string) {
    Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/profile.jpg")}
          style={styles.profileImage}
          resizeMode='cover'
        />

        <Text style={styles.title}>Sobre o Projeto</Text>
        <Text style={styles.author}>Criado por @thiagocoding</Text>

        <Text style={styles.description}>
          Pokédex desenvolvida com React Native, Expo Router, TypeScript, Axios,
          Context API e AsyncStorage.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Perfil GitHub</Text>

          <Pressable
            style={styles.linkButton}
            onPress={() => openLink(githubUrl)}>
            <Ionicons name='logo-github' size={20} color='#222' />
            <Text style={styles.linkText}>{githubUrl}</Text>
          </Pressable>

          <Text style={[styles.label, styles.repositoryLabel]}>
            Repositório do projeto
          </Text>

          <Pressable
            style={styles.linkButton}
            onPress={() => openLink(repositoryUrl)}>
            <Ionicons name='code-slash' size={20} color='#222' />
            <Text style={styles.linkText}>thiagoocoding/pokedex-react-native</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: "#EF5350",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },

  author: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF5350",
    marginBottom: 18,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    marginBottom: 22,
  },

  infoBox: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 8,
  },

  repositoryLabel: {
    marginTop: 16,
  },

  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  linkText: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    textDecorationLine: "underline",
  },
});
