import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import { Route } from "./components";
import { Start, Select, Game, Score, Credits, Settings } from "./views";
import { AppContext } from "./contexts";
import { useContext } from "react";
import SoundPlayer from "./helpers/SoundPlayer";
import {Audio} from "./constants";
export default function App() {
  const [appState, setAppState] = useContext(AppContext);
  const stopSound = new SoundPlayer(Audio.Stop,false);
  const startSound = new SoundPlayer(Audio.Start,false);
  const normalSound = new SoundPlayer(Audio.NormalLayer,true);
  const clockSound = new SoundPlayer(Audio.Bgm,true);
  const startBgmSound = new SoundPlayer(Audio.StartBgm,true);
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
