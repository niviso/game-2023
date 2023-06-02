import { TouchableOpacity } from "react-native";
import { Style,generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {startBgmSound} from "../../helpers/SoundPlayer";
import {useEffect} from "react";
import i18n from "../../locales";
import { Direction } from "../../constants";
import {NavigationButton} from "../../components";
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
          {i18n.t('view.start.title')}
        </Animatable.Text>
          <Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{ color: "white", marginTop: 25, fontSize: 25 }}>
          {i18n.t('view.start.subTitle')}
          </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
    <NavigationButton onClick={() => setRoute({path:"Credits",data:{}})} textColor={color} title={i18n.t('button.credits')} direction={Direction.Right}/>
    </>
  );
}