import { View, Text, Pressable } from "react-native";
import { Style, Color } from "../../constants";

export default function Select({ appState, setAppState }) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Pressable
        onPress={() => setAppState({ ...appState, path: "game" })}
        style={{
          ...Style.flexCenter,
          width: "100%",
          height: "50%",
          backgroundColor: Color["primary"].slot_03,
        }}
      >
        <Text
          style={{ fontSize: 70, transform: "rotate(90deg)", color: "white" }}
        >
          Versus
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setAppState({ ...appState, path: "game" })}
        style={{
          ...Style.flexCenter,
          width: "100%",
          height: "50%",
          background: "white",
        }}
      >
        <Text style={{ fontSize: 70, color: Color["primary"].slot_03 }}>
          Solo
        </Text>
      </Pressable>
    </View>
  );
}
