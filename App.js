import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constant";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola ben, spicy taco {Colors["primary"].slot_01}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["primary"].slot_03,
    alignItems: "center",
    justifyContent: "center",
  },
});
