import { View, Text,TouchableOpacity } from "react-native";
import { useEffect,useRef,useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Color, Screen, generateColor } from "../../constants";
import { MathHelper } from '../../helpers';


export default function ColorPad(props) {
    const { _onClick, active, player, gameState } = props;
  
    const [color, setColor] = useState(gameState.mode === "oneColor" ? "black" : generateColor());
    const [time, setTime] = useState(0);
    const [seed,setSeed] = useState(0);
    const animatableRef = useRef<Animatable.View & View>(null); 
    
    const getSeedColor = () => {
      if(seed == 0){
        setSeed(1);
        return Color.primary.slots.slot_01;
      } else if(seed == 1){
        setSeed(2);
        return Color.primary.slots.slot_02;
      } else if(seed == 2){
        setSeed(3);
        return Color.primary.slots.slot_03;
      } else if(seed == 3){
        setSeed(0);
        return Color.primary.slots.slot_04;
      }
    }
    const updateColor = () => {
      const newColor = gameState.mode == "oneColor" ? getSeedColor() : generateColor();
  
        if(newColor === color && gameState.mode !== "oneColor") {
          updateColor();
        }
        setColor(newColor);
      animatableRef.current.animate({0: {backgroundColor: color},1: {backgroundColor: newColor}})
  
    }
    useEffect(() => {
      let intervall = setTimeout(() => {
        const newTime = time - 1;
        if (newTime <= 0) {
          updateColor();
          setTime(1);
        } else {
          console.log("ELSE",newTime);
          setTime(newTime);
        }
      }, 1000);
    }, [time]);
  
    const onPress = ():void => {
      if(!active){
        return;
      }
      animatableRef.current.pulse();
      setColor(generateColor());
      setTime(gameState.mode == "oneColor" ? 1 : MathHelper.randomIntFromInterval(1, 5));
      _onClick(color,player);
    };
    return (
      <TouchableOpacity onPress={onPress}>
        <Animatable.View ref={animatableRef} duration={250}
          style={{
            width: Screen.Width * 0.2,
            height: Screen.Width * 0.2,
            backgroundColor: color,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: gameState.blocked === player ? 0.5 : 1
          }}
        >
          {gameState.blocked === player && (
              <Text style={{fontSize: 50,color: "white"}}>⨉</Text>
          )}
      </Animatable.View>
  
      </TouchableOpacity>
    );
  };