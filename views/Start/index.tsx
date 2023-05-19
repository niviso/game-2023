import { TouchableOpacity } from "react-native";
import { Style, Color } from "../../constants";
import * as Animatable from 'react-native-animatable';
export default function Start({setCurrentPath}) {

  const goToGame = () => {
    setCurrentPath("Game");
  }
  return (
    <TouchableOpacity onPress={goToGame} style={Style.fillScreen}>
      <Animatable.View duration={2000}
        style={{
          ...Style.flexCenter,
          ...Style.fillScreen,
          backgroundColor: Color.primary.slots.slot_01
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