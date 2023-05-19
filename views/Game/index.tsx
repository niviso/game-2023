import { View, Text,SafeAreaView, StyleSheet } from "react-native";
import { Screen, Player } from "../../constants";
import { useEffect, useState, useRef } from "react";
import * as Animatable from 'react-native-animatable';
import {startSound,normalSound,clockSound} from "../../helpers/SoundPlayer";
import {PlayerController} from "../../components";

const CountDown = ({active,countDown}) => {
  const countDownRef =  useRef<Animatable.View & View>(null);
  const flipEven = {
    0: {
      transform: [{rotateZ: "0deg"}],
    },
    1: {
      transform: [{rotateZ: "180deg"}],
    },
  };
  const flipOdd = {
    0: {
      transform: [{rotateZ: "180deg"}],
    },
    1: {
      transform: [{rotateZ: "360deg"}],
    },
  };
  useEffect(() => {
    setTimeout(()=> {
      if (countDown == 0) {
        countDownRef.current && countDownRef.current.flipOutY();
      } else {
        countDownRef.current.animate(countDown % 2 ? flipEven : flipOdd);
      }
    }, 1000);
  }, [countDown]);
  return (
    <View style={{display: !active ? "flex" : "none",position: "absolute",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
    <Animatable.View ref={countDownRef} animation="flipInY" iterationCount={1} style={{width: Screen.Width * 0.9,height:Screen.Width * 0.9,backgroundColor:"black",borderRadius: Screen.Width * 0.9,display: "flex",alignItems:"center",justifyContent:"center"}}>
      <Animatable.Text duration={2000} iterationCount={4} style={{fontSize: 300,color: "white"}}>{countDown}</Animatable.Text>
    </Animatable.View>
  </View>
  )
}



export default function Game({setCurrentPath}:any) {
  const [active,setActive] = useState<boolean>(false);
  const [countDown,setCountDown] = useState<number>(3);
  const [gameState,setGameState] = useState<any>({mode: "oneColor",blocked: null});
  const [gameTime,setGameTime] = useState<number>(0);

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
    if(clockSound.ready){
      normalSound.play();
  return () => {
    normalSound.destory();
  }
  }
  },[normalSound.ready]);
  
  useEffect(() => {
    setTimeout(()=> {
      if(countDown == 1){
        setGameState({...gameState,mode: ""})
      }
      if (countDown == 0) {
        setTimeout(() => {
        setGameTime(60);
        setActive(true);
      },1000);
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
  }, [countDown]);
  useEffect(() => {
    if(countDown == 0){
      setTimeout(()=> {
        if (gameTime == 0) {
          setCurrentPath("score");
        } else {
          setGameTime(gameTime - 1);
        }
      }, 1000);
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
  return ( 
    <SafeAreaView>
    <View style={styles.wrapper}>
      <View
        style={styles.innerWrapper}
      >
      <View style={styles.middleWrapper}>
          <Text style={styles.middleWrapperText}>{gameTime}</Text>
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
