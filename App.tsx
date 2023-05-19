import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import { Route } from "./components";
import {useState} from "react";
import { Start, Select, Game, Score, Credits, Settings } from "./views";
export default function App() {
  const [currentPath,setCurrentPath] = useState("start")
  return ( 
    <AppProvider>
      <StatusBar hidden />
      <>
        <Route path="start" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Start} />
        <Route path="select" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Select} />
        <Route path="game" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Game} />
        <Route path="score" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Score} />
        <Route path="credits" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Credits} />
        <Route path="settings" currentPath={currentPath} setCurrentPath={setCurrentPath} component={Settings} />
      </>
    </AppProvider>
  );
}
