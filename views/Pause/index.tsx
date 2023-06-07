import { View, Text } from "react-native";
export default function Pause({ route, appState }) {
  return (
    <View>
      <Text>
        Pause SCREEN {appState.route} ROUTE: {route}
      </Text>
    </View>
  );
}
