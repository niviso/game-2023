import { TouchableOpacity } from "react-native";
import { Style,generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {startBgmSound} from "../../helpers/SoundPlayer";
import {useEffect} from "react";
import {AsyncStorageHelper} from "../../helpers";

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
  const goToGame = async () => {
    const hasOnBoarded = await AsyncStorageHelper.get("onBoarding");
    if(hasOnBoarded == "1") {
      setCurrentPath("Game");
    } else {
      setCurrentPath("OnBoarding");
    }
  }
  return (
    <TouchableOpacity onPress={goToGame} style={Style.fillScreen}>
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
  );
}