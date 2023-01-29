import { StatusBar } from "expo-status-bar";
import { AppProvider } from "./context";
import Route from "./view/route";
import Start from "./view/start";
import Select from "./view/select";
import Game from "./view/game";
import Score from "./view/score";
import Credits from "./view/credits";
import Settings from "./view/settings";
import Pause from "./view/pause";

export default function App() {
  return (
    <AppProvider>
      <StatusBar hidden />
      <Route path="/" component={Start} />
      <Route path="/select" component={Select} />
      <Route path="/game" component={Game} />
      <Route path="/score" component={Score} />
      <Route path="/credits" component={Credits} />
      <Route path="/settings" component={Settings} />
      <Route path="/pause" component={Pause} />
    </AppProvider>
  );
}
