import { View, Text } from "react-native";
import { useEffect,useRef,useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Color, Screen, generateColor } from "../../constants";
import { usePrevious } from "../../hooks";

export default function ColorPad(props) {
    const { _onClick, active, player, gameState } = props;
  
    const [color, setColor] = useState(gameState.mode === "oneColor" ? "black" : generateColor());
    const [seed,setSeed] = useState(0);
    const prevColor = usePrevious(color);
    const [skipNextUpdate,setSkipNextUpdate] = useState(false);
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
        console.log("UPDATING color");

        const newColor = gameState.mode == "oneColor" ? getSeedColor() : generateColor();
        if(newColor === color) {
          updateColor();
        }
        setColor(newColor);
  
    }
    useEffect(() => {
      setTimeout(() => {
        if(!skipNextUpdate){
            updateColor();
        } else {
            setSkipNextUpdate(false);
        }

        console.log("Update effext!",Math.random());
      }, gameState.mode == "oneColor" ? 1000 : 2000);
    }, [color]);

    useEffect(() => {
        animatableRef.current.animate({0: {backgroundColor: prevColor},1: {backgroundColor: color}})
    },[color])
  
    const onPress = ():void => {
      if(!active){
        return;
      }
      animatableRef.current.pulse();
      setColor(generateColor());
      setSkipNextUpdate(true);
      _onClick(color,player);
    };
    return (
      <View onTouchStart={onPress}>
        <Animatable.View ref={animatableRef} duration={500}
          style={{
            width: Screen.Width * 0.2,
            height: Screen.Width * 0.2,
            backgroundColor: "black",
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
  
      </View>
    );
  };