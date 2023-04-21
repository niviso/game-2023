import { View, Text } from "react-native";
import { Effect, Link } from "../../components";
export default function Start({ route, appState }) {
  return (
    <View>
      <Text>
        Settings SCREEN {appState.route} ROUTE: {route}
      </Text>
      <Link to="game">Go to game</Link>
    </View>
  );
}
