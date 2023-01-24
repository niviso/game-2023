import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "./constant";
import { FaBeer } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola ben, spicy taco {Color["primary"].slot_01}</Text>
      <StatusBar style="auto" />
      <DiAndroid />
      <FaBeer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color["primary"].slot_03,
    alignItems: "center",
    justifyContent: "center",
  },
});
