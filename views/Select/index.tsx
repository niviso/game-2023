import { View, TouchableOpacity } from "react-native";
import { generateColor,Direction } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {AsyncStorageHelper} from "../../helpers";
import i18n from "../../locales";
import {NavigationButton} from "../../components";

export default function Select({ setRoute }) {
  const color = generateColor();
  const goToGame = async (solo:boolean) => {
    const hasOnBoarded = await AsyncStorageHelper.get("onBoarding");
    if(hasOnBoarded == "1") {
      setRoute({path:"Game",data:{solo:false}});
    } else {
      setRoute({path:"OnBoarding",data:{}});
    }
  }
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <TouchableOpacity
        onPress={() => goToGame(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50%",
          backgroundColor: "white",
          transform: [{rotate:'90deg'}]
        }}
      >
        <Animatable.Text
        animation="wobble" iterationCount="infinite" duration={2000} delay={2000}
          style={{ fontSize: 70, color: color }}
        >
          {i18n.t('view.select.vs')}
        </Animatable.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goToGame(true)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50%",
          backgroundColor: color,

        }}
      >

        <Animatable.Text animation="wobble" iterationCount="infinite" duration={2000} delay={1000} style={{ fontSize: 70, color: "white" }}>
        {i18n.t('view.select.solo')}
        </Animatable.Text>
      </TouchableOpacity>
    <NavigationButton onClick={() => setRoute({path:"Start"})} textColor={color} title={i18n.t('button.back')} direction={Direction.Left}/>
    <NavigationButton onClick={() => setRoute({path:"OnBoard"})} textColor={color} title={i18n.t('button.tutorial')} direction={Direction.Right}/>
    </View>
  );
}
