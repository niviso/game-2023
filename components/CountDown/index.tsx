import { View, StyleSheet } from "react-native";
import { Screen } from "../../constants";
import { useEffect, useRef } from "react";
import * as Animatable from 'react-native-animatable';
export default function CountDown({active,countDown}){
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