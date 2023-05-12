import { View, Text, TouchableOpacity } from "react-native";
import { Style, Color } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {useState,useEffect,useRef} from "react";
import {startBgmSound} from "../../helpers/SoundPlayer";
import { usePrevious } from "../../hooks";
 
export default function Start({ appState, setAppState }) {
  const [seed,setSeed] = useState(0);
  const animatableRef = useRef<Animatable.View & View>(null);
  const animatableTextRef = useRef<Animatable.Text & Text>(null);
  const [color,setColor] = useState(Color.primary.slots.slot_01);
  const prevColor = usePrevious(color || Color.primary.slots.slot_01);
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
    if(startBgmSound.ready){
      startBgmSound.play();
    }
  },[startBgmSound.ready]);

  const updateColor = () => {
    const newColor = getSeedColor();
    //console.log(prevColor,newColor)
    animatableRef.current.animate({0: {backgroundColor: prevColor},1: {backgroundColor: color}})
    animatableTextRef.current.animate({0: {color: animatableTextRef.current.props.style.color},1: {color: color}})

    setColor(newColor);
  }

  useEffect(() => {
    setTimeout(() => {
      updateColor();
    },2000);
  }, [seed]);
  return (
    <TouchableOpacity onPress={() => setAppState({...appState,path:"game"})} style={Style.fillScreen}>
      <Animatable.View ref={animatableRef} duration={2000}
        style={{
          ...Style.flexCenter,
          ...Style.fillScreen,
          backgroundColor: Color.primary.slots.slot_01
        }}
      >
        <Animatable.Text
        ref={animatableTextRef} animation="bounceIn" direction="alternate" duration={2000}
          style={{
            fontSize: 80,
            width: "90%",
            backgroundColor: "white",
            textAlign: "center",
            paddingTop: 25,
            paddingBottom: 25,
            color: Color.primary.slots.slot_01,
            borderRadius: 20,
          }}
        >
          COLOR FIGHT
        </Animatable.Text>
          <Animatable.Text animation="pulse" direction="alternate" iterationCount="infinite" duration={1000} delay={1000} style={{ color: "white", marginTop: 25, fontSize: 25 }}>
            Press anywhere to start
          </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
}