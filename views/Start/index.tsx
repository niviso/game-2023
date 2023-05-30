import { TouchableOpacity } from "react-native";
import { Style,generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {startBgmSound} from "../../helpers/SoundPlayer";
import {useEffect} from "react";

export default function Start({setCurrentPath}) {
  const color = generateColor();
  useEffect(() => {
    if(startBgmSound.ready){
    startBgmSound.play();
  return () => {
    startBgmSound.destory();
  }
}
  },[startBgmSound.ready]);
  const goToSelect = async () => {
    setCurrentPath("Select")
  }
  return (
    <>
    <TouchableOpacity onPress={goToSelect} style={Style.fillScreen}>
      <Animatable.View duration={2000}
        style={{
          ...Style.flexCenter,
          ...Style.fillScreen,
          backgroundColor: color
        }}
      >
        <Animatable.Text
        animation="bounceIn" direction="alternate" duration={2000}
          style={{
            fontSize: 80,
            width: "90%",
            backgroundColor: "white",
            textAlign: "center",
            paddingTop: 25,
            paddingBottom: 25,
            color: color,
            borderRadius: 20,
          }}
        >
          COLOR FIGHT
        </Animatable.Text>
          <Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{ color: "white", marginTop: 25, fontSize: 25 }}>
            Press anywhere to start
          </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
    <Animatable.View onTouchStart={() => setCurrentPath("Credits")} style={{position: "absolute",bottom: 25,right: 25, backgroundColor: "white",padding: 10}}><Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{fontSize: 18,color: color}}>CREDITS</Animatable.Text></Animatable.View>
    </>
  );
}