import { View, Text, StyleSheet } from "react-native";
import { generateColor, Screen, Player } from "../../constants";
import { useState, useRef, useEffect } from "react";
import { MathHelper } from '../../helpers';
import * as Animatable from 'react-native-animatable';
import {failSound,stopSound,normalSound,pressSound} from "../../helpers/SoundPlayer";
import PrecentageBar from "../PrecentageBar";
import ColorPad from "../ColorPad";
import {useInterval} from "../../helpers";

export default function PlayerController(props){
    const { player,active,setGameState,gameState, setPlayerData } = props;
    const [points,setPoints] = useState<number>(0);
    const [powerMeter,setPowerMeter] = useState<number>(0);
    const [time,setTime] = useState<number>(MathHelper.randomIntFromInterval(2, 10));
    const [color,setColor] = useState<string>(generateColor());
    const animatableRef = useRef<Animatable.View & View>(null); 
    const ammountOfColorPads:number = 4; 
  
    const onClick = (clickColor:string,player:string)=> {
      
      if(gameState.blocked == player){
        setPowerMeter(0);
        setPoints(0);
        failSound.play();
        animatableRef.current && animatableRef.current.animate({0:{transform: [{scale: 1},{rotateZ: "0deg"}]},0.33:{transform: [{scale: 1.5},{rotateZ: "10deg"}]},0.66:{transform: [{scale: 1.5},{rotateZ: "-10deg"}]},1:{transform: [{scale: 1},{rotateZ: "0deg"}]}})
      }
      if(clickColor == color) {
        setPoints((prevPoints) => (prevPoints + 1));
        if(powerMeter < 100){
          setPowerMeter(powerMeter + 10);
        }
        pressSound.play();
      } else if(clickColor != color) {
        if(points > 0){
          setPoints((prevPoints) => (prevPoints - 1));
        }
        pressSound.play();
      }
    };

    useEffect(() => {
      setPlayerData({points: points, stopped: 0});
    },[points]);

    useInterval(() => {
      if(!gameState.paused){
        if (time == 0) {
          setColor(generateColor());
          setTime(MathHelper.randomIntFromInterval(1, 5));
        } else {
          setTime(time - 1);
        }
      }
    },1000);
  
    
  
    const styles = StyleSheet.create({
      wrapper: {
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: player == Player.One ? "column" : "column-reverse",
      },
      innerWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding:15
      },
      precentageBarWrapper:{height: 80,display: "flex",justifyContent:"center"},
      pointsWrapper: {display: "flex",flexDirection: player == Player.One ? "column-reverse" : "column",alignItems:"center",justifyContent: player == Player.One ? "flex-end" : "flex-start"}
    });
  
    const blockPlayer = () => {
      stopSound.play();
      normalSound.setMute(true);
      setPowerMeter(0);
      setGameState({...gameState,blocked: player === Player.One ? Player.Two : Player.One})
    }
    //Refactor colorpad to a forloop
    return (
          <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
              <ColorPad gameState={gameState} player={player} active={active} onClick={onClick} />
              <ColorPad gameState={gameState} player={player} active={active} onClick={onClick} />
              <ColorPad gameState={gameState} player={player} active={active} onClick={onClick} />
              <ColorPad gameState={gameState} player={player} active={active} onClick={onClick} />
            </View>
            <View style={styles.precentageBarWrapper}>
              <PrecentageBar gameState={gameState} player={player} onPressStop={blockPlayer} value={powerMeter} color={color}/>
              </View>
              <View style={styles.pointsWrapper}>
                <View style={{height:150}}/>
                <Animatable.View ref={animatableRef} duration={1500} style={{width: Screen.Width * 0.2,height: Screen.Width * 0.2,borderRadius: 50,backgroundColor:color,display: "flex",alignItems:"center",justifyContent: "center"}}>
                <Text style={{fontSize: 50,color: "white"}}>{points}</Text>
              </Animatable.View>
            </View>
          </View>
    );
  };