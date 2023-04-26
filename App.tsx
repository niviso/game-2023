import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import { Route } from "./components";
import { Start, Select, Game, Score, Credits, Settings } from "@/views";
import { AppContext } from "@/contexts";
import { useContext } from "react";
export default function App() {
  const [appState, setAppState] = useContext(AppContext);

  return (
    <AppProvider>
      <StatusBar hidden />
      <Route path="start" component={Start} />
      <Route path="select" component={Select} />
      <Route path="game" component={Game} />
      <Route path="score" component={Score} />
      <Route path="credits" component={Credits} />
      <Route path="settings" component={Settings} />
    </AppProvider>
  );
}
