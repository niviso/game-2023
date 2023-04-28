import { View, Text, TouchableOpacity, Dimensions,SafeAreaView } from "react-native";
import { Color } from "../../constants";
import { useEffect, useState, useRef } from "react";
import { Audio } from 'expo-av';
import AudioHelper from "../../helpers/AudioHelper";
import * as Animatable from 'react-native-animatable';
const randomIntFromInterval = (min:number, max:number):number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateColor = ():string => {
  const obj = Color.primary.slots;
  const keys = Object.keys(obj);
  const color = keys[Math.floor(Math.random() * keys.length)];
  return obj[color];
};

const PrecentageBar = ({value,color}:any) => {
  return (
    <View style={{position: "relative",width: "100%",height: 30,backgroundColor:"black"}}>
      <View style={{position:"absolute",width: value.toString()+"%",height:30,backgroundColor: color}}/>
    </View>
  )
}

const PlayerController = (props) => {
  const { player,active } = props;
  const [points,setPoints] = useState<number>(0);
  const [powerMeter,setPowerMeter] = useState<number>(0);
  const [time,setTime] = useState<number>(randomIntFromInterval(2, 10));
  const [color,setColor] = useState<string>(generateColor());


  const onClick = (clickColor:string)=> {
    if(clickColor === color) {
      setPoints((prevPoints) => (prevPoints + 1));
      setPowerMeter((prevPowerMeter) => (prevPowerMeter + 5));
    } else if(points > 0) {
      setPoints((prevPoints) => (prevPoints - 1))
    }
  };

  useEffect(() => {
    let intervall = setInterval(()=> {
      if (time == 0) {
        setColor(generateColor());
        setTime(randomIntFromInterval(1, 5));
      } else {
        setTime(time - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [time]);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: player == "P1" ? "column" : "column-reverse",
        justifyContent: "space-between",
      }}
    >

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: player == "P1" ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ColorPad player={player} active={active} _onClick={onClick} />
        <ColorPad player={player} active={active} _onClick={onClick} />
        <ColorPad player={player} active={active} _onClick={onClick} />
        <ColorPad player={player} active={active} _onClick={onClick} />
        
      </View>
      <PrecentageBar value={powerMeter} color={color}/>

      <View style={{display: "flex",flexDirection: player == "P1" ? "column-reverse" : "column",alignItems:"center",justifyContent: player == "P1" ? "flex-end" : "flex-start"}}>
      <View style={{transform: [ {rotate: player == "P1" ? '180deg' : '0deg'}]}}>
        
        <View style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
        <Text style={{width:100,fontSize: 60,marginTop: -100,textAlign: "left"}}>{points}</Text>
        <View style={{width: 1,height:200,backgroundColor: "black"}}/>
        <Text style={{width:100,fontSize: 14}}></Text>
        

        </View>
        </View>
        <Animatable.View animation="pulse" iterationCount="infinite" style={{width: 70,height: 70,borderRadius: 50,backgroundColor:color,display: "flex",alignItems:"center",justifyContent: player == "P1" ? "flex-end" : "flex-start"}}/>
      </View>
    </View>
  );
};

const ColorPad = (props) => {
  const { _onClick, active, player } = props;

  const [color, setColor] = useState(generateColor());
  const [time, setTime] = useState(randomIntFromInterval(1, 3));
  const animatableRef = useRef<Animatable.View & View>(null);  const updateColor = () => {
    const newColor = generateColor();
    if(newColor === color) {
      updateColor();
    }
    setColor(newColor);
  }
  useEffect(() => {
    let intervall = setInterval(() => {
      if (time == 0) {
        updateColor();
        setTime(randomIntFromInterval(1, 3));
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [time]);

  const onPress = ():void => {
    if(!active){
      return;
    }
    animatableRef.current.pulse();
    setColor(generateColor());
    setTime(randomIntFromInterval(1, 5));
    _onClick(color);
  };
  return (
    <Animatable.View  ref={animatableRef}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").width * 0.2,
          backgroundColor: color,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{display:"none",fontSize: 32,fontWeight: "bold", transform: [{rotate: player == "P1" ? "180deg" : "0deg"}], color: "white"}}>{time}</Text>
        </TouchableOpacity>
    </Animatable.View>
  );
};

export default function Game(props) {
  const { appState,setAppState } = props;
  const [gameTime,setGameTime] = useState<number>(120);
  const [countDown,setCountDown] = useState<number>(3);
  const [active,setActive] = useState(false);
  const [paused,setPaused] = useState(false);
  const [sound, setSound] = useState();
  const countDownRef =  useRef<Animatable.View & View>(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./bgm.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {

    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound();
  },[]);
  useEffect(() => {
    let intervall = setInterval(()=> {
      if (gameTime == 0) {
        setAppState({...appState,path: "score"})
      } else {
        setGameTime(gameTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [gameTime]);

  useEffect(() => {
    let intervall = setInterval(()=> {
      if (countDown == 0) {
        countDownRef.current && countDownRef.current.flipOutY();
        setTimeout(() => {
          setActive(true);
        },1000);
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [countDown]);

  const flip = {
    0: {
      transform: [{rotateZ: "0deg"}],
    },
    1: {
      transform: [{rotateZ: "360deg"}],
    },
  };
  return (
    <>
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-between"
        }}
      >
      <View style={{position: "absolute",zIndex: -1,width:"100%",height:"100%",display: "flex",alignItems:"center",justifyContent:"center",transform: [{rotate:'90deg'}]}}>
          <Text style={{fontSize: 170,color: "black",opacity: 0.1}}>{gameTime}</Text>
      </View>

        <View style={{ width: "100%", height: "50%" }}>
          <PlayerController active={active} player="P1" />
        </View>
        <View style={{width: "100%", height: "50%" }}>
          <PlayerController active={active} player="P2" />
        </View>
      </View>
    </SafeAreaView>
      <View style={{display: !active ? "flex" : "none",position: "absolute",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
        <Animatable.View ref={countDownRef} animation="flipInX" iterationCount={1} style={{width: Dimensions.get("window").width * 0.9,height:Dimensions.get("window").width * 0.9,backgroundColor:"black",borderRadius: Dimensions.get("window").width * 0.9,display: "flex",alignItems:"center",justifyContent:"center"}}>
          <Animatable.Text animation={flip} duration={1000} iterationCount={4} style={{fontSize: 300,color: "white"}}>{countDown}</Animatable.Text>
        </Animatable.View>
      </View>
    </>
  );
}
