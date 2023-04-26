import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import { Route } from "./components";
import { Start, Select, Game, Score, Credits, Settings } from "@/views";

export default function App() {
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
