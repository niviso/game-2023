import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import { Start, Select, Game, Score, Credits, Settings } from "./views";
export default function App() {
  const [currentPath,setCurrentPath] = useState("Game");
  const paths = [Start, Select, Game, Score, Credits, Settings];
  return ( 
    <AppProvider>
      <StatusBar hidden />
      <>
      {paths.map((Component:any,index:number) => {
          if(Component.name == currentPath){
          return <Component key={index} setCurrentPath={setCurrentPath}/>
          }
      })}
      </>
    </AppProvider>
  );
}
