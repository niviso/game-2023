import { View, Text, StyleSheet } from "react-native";
import { useEffect,useRef,useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Color, Screen, generateColor,Time,GameMode } from "../../constants";
import { usePrevious } from "../../hooks";


const useInterval = (callback, delay) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};



export default function ColorPad(props) {
    const { onClick, active, player, gameState } = props;
  
    const [color, setColor] = useState<string>(Color.white);
    const prevColor = usePrevious(color || Color.white);
    const [seed,setSeed] = useState<number>(0);
    
    const [skipNextUpdate,setSkipNextUpdate] = useState<boolean>(false);
    const animatableRef = useRef<Animatable.View & View>(null); 
    const animatableWrapperRef = useRef<Animatable.View & View>(null); 
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

    useEffect(() => {
      animatableRef.current && animatableRef.current.animate({0: {backgroundColor: prevColor},1: {backgroundColor: color}})
    },[color]);
    
    const updateColor = ():void => {
        const newColor = gameState.mode == GameMode.oneColor ? getSeedColor() : generateColor();
        if(color === newColor) {
          console.log("Girl same color try again");
          updateColor();
        }
        setColor(newColor);
    }

    useInterval(() => {
      if(!skipNextUpdate){
        updateColor();
    } else {
        setSkipNextUpdate(false);
    }
    }, Time.Second);
  
    const onPress = ():void => {
      if(!active){
        return;
      }
      animatableWrapperRef.current && animatableWrapperRef.current.animate({0:{transform: [{scale: 1}]},0.5:{transform: [{scale: 0.5}]},1:{transform: [{scale: 1}]}});
      updateColor();
      setSkipNextUpdate(true);
      onClick(color,player);
    };
    const styles = StyleSheet.create({
        wrapper: {
            width: Screen.Width * 0.2,
            height: Screen.Width * 0.2,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: gameState.blocked === player ? 0.5 : 1
          },
          textWrapper: {fontSize: 50,color: Color.white}
    });
    return (
      <Animatable.View ref={animatableWrapperRef} duration={250} onTouchStart={onPress}>
        <Animatable.View ref={animatableRef} duration={250}
          style={styles.wrapper}
        >
          {gameState.blocked === player && (
              <Text style={styles.textWrapper}>⨉</Text>
          )}
          <Text>{skipNextUpdate ? "SKIP" : ""}</Text>
      </Animatable.View>
  
      </Animatable.View>
    );
  };