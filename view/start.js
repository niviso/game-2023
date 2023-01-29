import { View, Text } from "react-native";
import Link from "../component/link/link";
import { Style, Color } from "../constant";
export default function Start({ route, appState }) {
  return (
    <Link to="game" style={Style.fillScreen}>
      <View
        style={{
          ...Style.flexCenter,
          ...Style.fillScreen,
          backgroundColor: Color["primary"].slot_02,
        }}
      >
        <Text style={{ fontSize: 50, color: Color["primary"].slot_01 }}>
          TIP TAP
        </Text>
      </View>
    </Link>
  );
}
