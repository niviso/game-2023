import { View, Text } from "react-native";
import { Effect, Link } from "../../components/";
import { Style, Color } from "../../constant";
export default function Start({ route, appState, setAppState }) {
  return (
    <Link to="select" style={Style.fillScreen}>
      <View
        style={{
          ...Style.flexCenter,
          ...Style.fillScreen,
          backgroundColor: Color["primary"].slot_03,
        }}
      >
        <Text
          style={{
            fontSize: 80,
            width: "90%",
            backgroundColor: "white",
            textAlign: "center",
            paddingTop: 25,
            paddingBottom: 25,
            color: Color["primary"].slot_03,
            borderRadius: 20,
          }}
        >
          COLOR FIGHT
        </Text>
        <Effect>
          <Text style={{ color: "white", marginTop: 25, fontSize: 25 }}>
            Press anywhere to start
          </Text>
        </Effect>
      </View>
    </Link>
  );
}
