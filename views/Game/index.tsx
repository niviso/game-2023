import { View,SafeAreaView, StyleSheet,AppState,Text } from "react-native";
import { Screen, Player,Time, GameMode } from "../../constants";
import { useEffect, useState,useRef } from "react";
import {startSound,normalSound,clockSound} from "../../helpers/SoundPlayer";
import {PlayerController,CountDown,Clock} from "../../components";




export default function Game({setCurrentPath}:any) {
  const [active,setActive] = useState<boolean>(false);
  const [countDown,setCountDown] = useState<number>(3);
  const [gameState,setGameState] = useState<any>({mode: GameMode.oneColor,blocked: null,paused:false});
  const [gameTime,setGameTime] = useState<number>(0);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if(clockSound.ready){
    clockSound.play();
    clockSound.setVolume(0.3);
  return () => {
    clockSound.destory();
  }
}
  },[clockSound.ready]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setGameState({...gameState,paused:true});
      } else if(appState.current == 'active') {
        setGameState({...gameState,paused:false});
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if(clockSound.ready){
      normalSound.play();
  return () => {
    normalSound.destory();
  }
  }
  },[normalSound.ready]);
  
  useEffect(() => {
    setTimeout(()=> {
      if (countDown == 0) {
        setGameTime(Time.getMinutes(1));
        setGameState({...gameState,mode: GameMode.none})
        setTimeout(() => {
        setActive(true);
      },Time.getSecondsInMs(1));
      } else {
        setCountDown(countDown - 1);
      }
    }, Time.getSecondsInMs(1));
  }, [countDown]);
  useEffect(() => {
    if(countDown == 0){
      setTimeout(()=> {

        if (gameTime == 0) {
          setCurrentPath("Score");
        } else {
          setGameTime(gameTime - 1);
        }
      }, Time.getSecondsInMs(1));
    }
  }, [gameTime]);

  useEffect(() => {
    if(gameState.blocked){
      setTimeout(() => {
        startSound.play();
      },4000);
      setTimeout(() => {
        setGameState({...gameState,blocked: null});
        normalSound.setMute(false);
      },5000);
    }
  },[gameState]);

  const styles = StyleSheet.create({
    wrapper: { width: "100%", height: "100%" },
    innerWrapper: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent:"space-between"
    },
    middleWrapper: {position: "absolute",zIndex: -1,width:"100%",height:"100%",display: "flex",alignItems:"center",justifyContent:"center",transform: [{rotate:'90deg'}]},
    middleWrapperText: {fontSize: Screen.Width * 0.2, fontWeight: "100",color: "black"},
    playerWrapper: { width: "100%", height: "50%" }
  });
  //return <ColorPad gameState={gameState} active={true} player="P1" onClick={() => console.log("hej")}/>
  return <Text style={{padding: 50}}>{gameState.paused ? "PAUSED" : "NO PAUS"}</Text>
  return ( 
    <SafeAreaView>
    <View style={styles.wrapper}>
      <View
        style={styles.innerWrapper}
      >
      <View style={styles.middleWrapper}>
          <Clock time={gameTime}/>
      </View>

        <View style={styles.playerWrapper}>
          <PlayerController setGameState={setGameState} gameState={gameState} active={active} player={Player.One} />
        </View>
        <View style={styles.playerWrapper}>
          <PlayerController setGameState={setGameState} gameState={gameState} active={active} player={Player.Two} />
        </View>
      </View>
    </View>
    <CountDown active={active} countDown={countDown}/>
    </SafeAreaView>
  );
}
