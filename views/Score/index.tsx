import { View, Text,SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';
import {useInterval} from "../../helpers";
import { useState,useEffect,useRef } from "react";

export default function Score({ data,setRoute }) {
  const [scoreData,setScoreData] = useState({playerOneWinner: false,playerTwoWinner: false});
  const tmpData={
    mode: "versus",
    player_1:{
      stopped: 5,
      points: 10
    },
    player_2:{
      stopped: 2,
      points: 20
    }
  }

  const onFinish = () => {
    return true;
  }


  const CountUp = ({points,onFinish,isWinner}) => {
    const [currentPoints,setCurrentPoints] = useState<number>(0);
    const [speed,setSpeed] = useState(0);
    const animatableRef = useRef<Animatable.View & View>(null); 
    useInterval(() => {
      let newPoints = currentPoints + 1;
      setCurrentPoints(newPoints);
      let normalized = ((currentPoints/points)/points);
      let speedCalc  = normalized * 5000;
      setSpeed(speedCalc);
      if(newPoints == points){
        onFinish();
        if(isWinner){
          winnerAnimation();
        } else {
          looseAnimation();
        }
      }
    },currentPoints===points ? null : speed);

    const winnerAnimation = () => {
      animatableRef.current.pulse();
      setTimeout(() => {
        animatableRef.current && animatableRef.current.animate({0: {backgroundColor: "black"},1: {backgroundColor: "green"}})
      },1000);
    }
    const looseAnimation = () => {
      animatableRef.current.pulse();
      setTimeout(() => {
        animatableRef.current && animatableRef.current.animate({0: {backgroundColor: "black"},1: {backgroundColor: "red"}})
      },1000);
    }
    return (
      <View style={{display: "flex",flexDirection:"column",alignItems:"center",justifyContent: "flex-end",height: 200}}>
        {(points === currentPoints && isWinner) && <Animatable.Text animation="bounceIn" style={{fontSize: 60,color: "green",marginBottom: 10}}>WINNER</Animatable.Text>}
        {(points === currentPoints && !isWinner) && <Animatable.Text animation="bounceIn" style={{fontSize: 60,color: "red",marginBottom: 10}}>LOOSER</Animatable.Text>}
        <Animatable.View ref={animatableRef} animation="bounceIn" duration={1000} style={{width: 200,height: 200,backgroundColor: "black",display: "flex",alignItems:"center",justifyContent:"center",borderRadius: "100%"}}>
          <Text style={{fontSize: 100,color: "white"}}>{currentPoints}</Text>
        </Animatable.View>
        
      </View>
    );
  }

  return (
    <SafeAreaView style={{display: "flex",alignItems:"center",justifyContent: "space-between",width: "100%",height: "100%"}}>
      <View style={{transform:[{rotateZ: "180deg"}]}}>
        <CountUp onFinish={onFinish} points={20} isWinner={true}/>
      </View>
      <Animatable.View onTouchStart={() => setRoute({path: "Game",data:{}})} animation="rotate" iterationCount="infinite" iterationDelay={2000} style={{width: 200,height: 70,backgroundColor:"black",display: "flex",alignItems:"center",justifyContent: "center",borderRadius:10}}>
       <Text style={{color: "white",fontSize: 28}}>PLAY AGAIN</Text>
      </Animatable.View>
      <View style={{transform:[{rotateZ: "0deg"}]}}>
        <CountUp onFinish={onFinish} points={10} isWinner={false}/>
      </View>

    </SafeAreaView>
  );
}
