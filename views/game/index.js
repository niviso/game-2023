import { View, Text } from "react-native";
import { Effect, Link } from "../../components/";
export default function Game({ route, appState }) {
  return (
    <View>
      <Text>
        GAME SCREEN {appState.route} ROUTE: {route}
      </Text>
      <Link to="start">
        <Text>Go to start</Text>
      </Link>
    </View>
  );
}
