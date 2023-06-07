import { View, Text } from "react-native";
export default function Settings({ route, appState }) {
  return (
    <View>
      <Text>
        Settings SCREEN {appState.route} ROUTE: {route}
      </Text>
    </View>
  );
}
