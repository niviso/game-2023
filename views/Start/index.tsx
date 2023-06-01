import { TouchableOpacity } from "react-native";
import { Style,generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {startBgmSound} from "../../helpers/SoundPlayer";
import {useEffect} from "react";

export default function Start({route,setRoute}) {
  const color = generateColor();
  /*useEffect(() => {
    if(startBgmSound.ready){
    startBgmSound.play();
  return () => {
    startBgmSound.destory();
  }
}
  },[startBgmSound.ready]);*/
  const goToSelect = async () => {
    setRoute({path:"Select",data:{}});
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
    <Animatable.View animation="slideInUp" duration={500} onTouchStart={() => setRoute({path:"Credits",data:{}})} style={{position: "absolute",bottom: 0,right: 0, backgroundColor: "white",width: 140,height:80,display: "flex",alignItems:"center",justifyContent:"center",shadowColor: '#171717',shadowOffset: {width: 0, height: 4},shadowOpacity: 0.5,shadowRadius: 5,borderTopLeftRadius: 10}}><Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{fontSize: 20,color: color}}>CREDITS</Animatable.Text></Animatable.View>
    </>
  );
}