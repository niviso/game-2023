import { View, Text } from "react-native";
import { Effect, Link } from "../../components";
export default function Score({ route, appState }) {
  return (
    <View>
      <Text>
        Score SCREEN {appState.route} ROUTE: {route}
        ACTIVE ? {JSON.stringify(appState)}
      </Text>
    </View>
  );
}
