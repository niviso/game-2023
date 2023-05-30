import { View, TouchableOpacity } from "react-native";
import { generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {AsyncStorageHelper} from "../../helpers";

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
          Versus
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
          Solo
        </Animatable.Text>
      </TouchableOpacity>
      <Animatable.View animation="slideInUp" duration={500} onTouchStart={() => setRoute({path:"Start"})} style={{position: "absolute",shadowColor: '#171717',shadowOffset: {width: 0, height: 4},shadowOpacity: 0.5,shadowRadius: 5,borderTopRightRadius:10,display: "flex",alignItems:"center",justifyContent:"center",bottom:0,left:0,width: 140,height: 80,backgroundColor: "white",zIndex:99}}>
      <Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{fontSize: 20,color: color}}>BACK</Animatable.Text>
    </Animatable.View>
    <Animatable.View animation="slideInUp" duration={500} onTouchStart={() => setRoute({path:"OnBoard"})} style={{position: "absolute",shadowColor: '#171717',shadowOffset: {width: 0, height: 4},shadowOpacity: 0.5,shadowRadius: 5,borderTopLeftRadius:10,display: "flex",alignItems:"center",justifyContent:"center",bottom:0,right:0,width: 140,height: 80,backgroundColor: "white",zIndex:99}}>
    <Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{fontSize: 20,color: color}}>TUTORIAL</Animatable.Text>
    </Animatable.View>
    </View>
  );
}
