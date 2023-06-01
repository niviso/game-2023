import { AppProvider } from "./contexts";
import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { Start, Select, Game, Score, Credits, Settings, OnBoard } from "./views";
export default function App() {
  const [route,setRoute] = useState({path: "Start",data:{}});
  const paths = [Start, Select, Game, Score, Credits, Settings,OnBoard];

  
  // Set the key-value pairs for the different languages you want to support.
  const i18n = new I18n({
    en: { welcome: 'Hello' },
    ja: { welcome: 'こんにちは' },
  });
  
  // Set the locale once at the beginning of your app.
  i18n.locale = getLocales()[0].languageCode;
  
  console.log(i18n.t('welcome'));
  
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
