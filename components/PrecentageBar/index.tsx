import { View, Text,SafeAreaView, StyleSheet,TouchableOpacity } from "react-native";
import { useEffect,useRef } from "react";
import { usePrevious } from "../../hooks";
import * as Animatable from 'react-native-animatable';
import { Screen, Player } from "../../constants";


export default function PrecentageBar({value,color,onPressStop, player, gameState}:any) {
    const animatableRef = useRef<Animatable.View & View>(null);
    const prevColor = usePrevious(color);
    const prevValue = usePrevious(value);
    useEffect(() => {
      if(prevValue !== 100){
        animatableRef.current && animatableRef.current.animate({0: {backgroundColor: prevColor, width: (100 - (prevValue || 0)).toString()+"%"},1: {backgroundColor: color, width: (100 - value).toString()+"%"}});
      }
    },[color,value]);
  
  
    const styles = StyleSheet.create({
      wrapper: {position: "relative",width: Screen.Width,height: 30,backgroundColor:color},
    });
  
    return (
      <View style={{width: Screen.Width, display: "flex",alignItems: "center",justifyContent: player == Player.One ? "space-between" : "center"}}>
      { value !== 100 ? (
        
      <Animatable.View duration={250} ref={animatableRef} style={styles.wrapper}/>
      ) : (
      <TouchableOpacity onPress={onPressStop} style={{opacity: gameState.blocked === player ? 0.5 : 1}}>
      <Animatable.View duration={500} animation="flipInX" style={{display: "flex",justifyContent:"center",alignItems:"center",width: Screen.Width * 0.3,height: Screen.Height * 0.07,backgroundColor: color, borderRadius: 10}}>
        <Animatable.Text duration={1000} animation="pulse" iterationCount="infinite" style={{color:"white",fontSize: 30}}>STOP</Animatable.Text>
      </Animatable.View>
      </TouchableOpacity>
      )}
      </View>
    )
  }