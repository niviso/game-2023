import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import { Start, Select, Game, Score, Credits, Settings, OnBoard } from "./views";
export default function App() {
  const [route,setRoute] = useState({path: "Score",data:{}});
  const paths = [Start, Select, Game, Score, Credits, Settings,OnBoard];
  
  return ( 
    <AppProvider>
      <StatusBar hidden />
      <>
      {paths.map((Component:any,index:number) => {
          if(Component.name == route.path){
          return <Component key={index} route={route} setRoute={setRoute}/>
          }
      })}
      </>
    </AppProvider>
  );
}
