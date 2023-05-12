import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import { Route } from "./components";
import { Start, Select, Game, Score, Credits, Settings } from "./views";
import {useState} from "react";
import {Text} from "react-native";

export default function App() {

  const [loaded,setLoaded] = useState<boolean>(true);

  




  return (
    <AppProvider>
      <StatusBar hidden />
      {loaded ? (
      <>
        <Route path="start" component={Start} />
        <Route path="select" component={Select} />
        <Route path="game" component={Game} />
        <Route path="score" component={Score} />
        <Route path="credits" component={Credits} />
        <Route path="settings" component={Settings} />
      </>
      ) : (
        <>
        <Text>Loading</Text>
        </>
      )}
    </AppProvider>
  );
}
