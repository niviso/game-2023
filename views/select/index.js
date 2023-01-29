import { View, Text } from "react-native";
import { Effect, Link } from "../../components/";
export default function Select({ route, appState }) {
  return (
    <View>
      <Text>
        Select SCREEN {appState.route} ROUTE: {route}
      </Text>
      <Link to="game">Go to game</Link>
    </View>
  );
}
