import { View, Text } from "react-native";
import Link from "../component/link/link";
export default function Credits({ route, appState }) {
  return (
    <View>
      <Text>
        Credits SCREEN {appState.route} ROUTE: {route}
      </Text>
      <Link to="game">Go to game</Link>
    </View>
  );
}
