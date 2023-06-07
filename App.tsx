import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import { Start, Select, Game, Score, Credits, Settings, OnBoard } from "./views";
export default function App() {
  const [route,setRoute] = useState({path: "Game",data:{}});
  const paths = [Start, Select, Game, Score, Credits, Settings,OnBoard];
  
  return ( 
    <>
      <StatusBar hidden />
      <>
      {paths.map((Component:any,index:number) => {
          if(Component.name == route.path){
          return <Component key={index} data={route.data} route={route} setRoute={setRoute}/>
          }
      })}
      </>
    </>
  );
}
