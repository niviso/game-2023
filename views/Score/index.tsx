import { View, Text,SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';
import {useInterval} from "../../helpers";
import { useState,useRef } from "react";
import i18n from "../../locales";

export default function Score({ data,setRoute }) {
  const tmpData={
    mode: "versus",
    player_1:{
      stopped: 5,
      points: 55
    },
    player_2:{
      stopped: 2,
      points: 50
    }
  }



  const CountUp = ({points,isWinner,tmpData}) => {
    const [currentPoints,setCurrentPoints] = useState<number>(0);
    const animatableRef = useRef<Animatable.View & View>(null);
    const maxPoints = tmpData.player_1.points > tmpData.player_2.points ? tmpData.player_1.points : tmpData.player_2.points;
    const velocityVector = maxPoints/points;
    const speedConstant = 50;  
    const speed = velocityVector * speedConstant;
    useInterval(() => {
      let newPoints = currentPoints + 1;
      setCurrentPoints(newPoints);
      if(newPoints == points){
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
        {(points === currentPoints && isWinner) && <Animatable.Text animation="bounceIn" style={{fontSize: 60,color: "green",marginBottom: 10}}>{i18n.t("view.score.winner")}</Animatable.Text>}
        {(points === currentPoints && !isWinner) && <Animatable.Text animation="bounceIn" style={{fontSize: 60,color: "red",marginBottom: 10}}>{i18n.t("view.score.looser")}</Animatable.Text>}
        <Animatable.View ref={animatableRef} onTouchStart={() => animatableRef.current && currentPoints === points && animatableRef.current.pulse()} animation="bounceIn" duration={1000} style={{width: 200,height: 200,backgroundColor: "black",display: "flex",alignItems:"center",justifyContent:"center",borderRadius: "100%"}}>
          <Text style={{fontSize: 100,color: "white"}}>{currentPoints}</Text>
        </Animatable.View>
        
      </View>
    );
  }

  return (
    <SafeAreaView style={{display: "flex",alignItems:"center",justifyContent: "space-between",width: "100%",height: "100%"}}>
      <View style={{transform:[{rotateZ: "180deg"}]}}>
        <CountUp onFinish={onFinish} tmpData={tmpData} points={tmpData.player_1.points} isWinner={tmpData.player_1.points > tmpData.player_2.points}/>
      </View>
      <View style={{display: "flex",flexDirection: "column", gap: 25}}>
      <View style={{transform: [{rotateZ: "180deg"}]}}>
        <Animatable.View onTouchStart={() => setRoute({path: "Select",data:{}})} animation="bounceIn" iterationDelay={2500} style={{width: 250,height: 70,backgroundColor:"black",display: "flex",alignItems:"center",justifyContent: "center",borderRadius:10}}>
        <Text style={{color: "white",fontSize: 28}}>{i18n.t("view.score.goToSelect")}</Text>
        </Animatable.View>
      </View>
      <View>
        <Animatable.View onTouchStart={() => setRoute({path: "Game",data:{}})} animation="bounceIn" iterationDelay={2000} style={{width: 250,height: 70,backgroundColor:"black",display: "flex",alignItems:"center",justifyContent: "center",borderRadius:10}}>
        <Text style={{color: "white",fontSize: 28}}>{i18n.t("view.score.playAgain")}</Text>
        </Animatable.View>
      </View>
      </View>
      <View style={{transform:[{rotateZ: "0deg"}]}}>
        <CountUp onFinish={onFinish} tmpData={tmpData} points={tmpData.player_2.points} isWinner={tmpData.player_2.points > tmpData.player_1.points}/>
      </View>

    </SafeAreaView>
  );
}
