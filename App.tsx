import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import { Start, Select, Game, Score, Credits, Settings, OnBoard } from "./views";
export default function App() {
  const [currentPath,setCurrentPath] = useState("OnBoard");
  const paths = [Start, Select, Game, Score, Credits, Settings,OnBoard];
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
