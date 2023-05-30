import { View, TouchableOpacity } from "react-native";
import { generateColor } from "../../constants";
import * as Animatable from 'react-native-animatable';
import {AsyncStorageHelper} from "../../helpers";

export default function Select({ setCurrentPath }) {
  const color = generateColor();
  const goToGame = async () => {
    const hasOnBoarded = await AsyncStorageHelper.get("onBoarding");
    if(hasOnBoarded == "1") {
      setCurrentPath("Game");
    } else {
      setCurrentPath("OnBoarding");
    }
  }
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <TouchableOpacity
        onPress={goToGame}
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
        onPress={goToGame}
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
    </View>
  );
}
