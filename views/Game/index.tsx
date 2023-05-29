import { View,SafeAreaView, StyleSheet,AppState,Text,TouchableOpacity } from "react-native";
import { Color,Screen, Player,Time, GameMode } from "../../constants";
import { useEffect, useState,useRef } from "react";
import {startSound,normalSound,clockSound} from "../../helpers/SoundPlayer";
import {PlayerController,CountDown,Clock} from "../../components";
import {useInterval} from "../../helpers";



function Pause({active,setGameState}:any){
  const styles = StyleSheet.create({
    wrapper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    button:{
      backgroundColor: Color.black,
      padding: 10,
      borderRadius: 10
    }
  });
  return active ? (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={() => setGameState((prevState) => ({...prevState,paused:false}))}>
      <Text style={{fontSize: 50,fontWeight: "bold",color: Color.white}}>RESUME</Text>
      </TouchableOpacity>
    </View>
  ) : null
}

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

  },[gameState.paused]);

  useEffect(() => {
    //Make into custom hook
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setGameState((prevState) => ({...prevState,paused:true}));
      } else if(appState.current == 'active') {
        setGameState((prevState) => ({...prevState,paused:false}));
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
    if(gameState.blocked){
      setTimeout(() => {
        startSound.play();
      },4000);
      setTimeout(() => {
        setGameState((prevState) => ({...prevState,blocked: null}));
        normalSound.setMute(false);
      },5000);
    }
  },[gameState]);

  useInterval(() => {
    if(!gameState.paused){
      if(countDown === 0){
        setGameTime(Time.getMinutes(1));
        setActive(true);
        setGameState((prevState) => ({...prevState,mode: GameMode.none}));
      }
      setCountDown((prevCountDown) => (prevCountDown - 1));
    }
  },countDown === -1 ? null : Time.getSecondsInMs(Time.second));

  useInterval(() => {
    if(countDown == -1){
      setTimeout(()=> {
        if (gameTime == 0) {
          setCurrentPath("Score");
        } else {
          !gameState.paused && setGameTime(gameTime - 1);
        }
      }, Time.getSecondsInMs(1));
    }  
  },Time.getSecondsInMs(Time.second));

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
  return (
    <>
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
    <Pause active={gameState.paused} setGameState={setGameState}/>
    </>
  );
}
