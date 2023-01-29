import { View, Text } from "react-native";
import Link from "../component/link/link";
export default function Game({ route, appState }) {
  return (
    <View>
      <Text>
        GAME SCREEN {appState.route} ROUTE: {route}
      </Text>
      <Link to="/">Go to start</Link>
    </View>
  );
}
