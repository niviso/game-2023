import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "./constant";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola ben, spicy taco {Color["primary"].slot_01}</Text>
      <StatusBar style="auto" />
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
