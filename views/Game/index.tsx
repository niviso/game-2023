import { View, Text,SafeAreaView, StyleSheet,TouchableOpacity } from "react-native";
import { Color, Screen } from "../../constants";
import { useEffect, useState, useRef } from "react";
import { Audio } from 'expo-av';
import { usePrevious } from "../../hooks";
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
  const animatableRef = useRef<Animatable.View & View>(null);
  const prevColor = usePrevious(color);
  const prevValue = usePrevious(value);
  useEffect(() => {
    animatableRef.current && animatableRef.current.animate({0: {backgroundColor: prevColor, width: (100 - (prevValue || 0)).toString()+"%"},1: {backgroundColor: color, width: (100 - value).toString()+"%"}});

  },[color,value]);

  useEffect(() => {
     // animatableRef.current && animatableRef.current.animate({0: {width: (100 - prevValue).toString()+"%"},1: {width: (100 - value).toString()+"%"}})
  },[value]);

  const styles = StyleSheet.create({
    wrapper: {position: "relative",width: Screen.Width,height: 30,backgroundColor:color},
  });

  return (
    <View style={{width: Screen.Width, display: "flex",alignItems: "center"}}>
    { value !== 100 ? (
      
    <Animatable.View duration={250} ref={animatableRef} style={styles.wrapper}/>
    ) : (
    <Animatable.View duration={500} animation="flipInX" style={{display: "flex",justifyContent:"center",alignItems:"center",width: Screen.Width * 0.5,height: Screen.Height * 0.1,backgroundColor: color, borderRadius: 10}}>
      <Animatable.Text duration={1000} animation="pulse" iterationCount="infinite" style={{color:"white",fontSize: 50}}>STOP</Animatable.Text>
    </Animatable.View>
    )}
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
      if(powerMeter < 100){
        setPowerMeter(powerMeter + 10);
      }
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

  const styles = StyleSheet.create({
    wrapper: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: player == "P1" ? "column" : "column-reverse",
      justifyContent: "space-between",
    },
    innerWrapper: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: player == "P1" ? "flex-start" : "flex-end",
      justifyContent: "space-between",
      padding: 10,
    }
  });

  return (
    <View style={styles.wrapper}>

      <View
        style={styles.innerWrapper}
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
        <Text style={{width:150,fontSize: 100,marginTop: -150,textAlign: "left"}}></Text>
        <View style={{width: 0,height:150,backgroundColor: "black"}}/>
        <Text style={{width:150,fontSize: 100}}></Text>
        

        </View>
        </View>
        <View style={{width: Screen.Width * 0.2,height: Screen.Width * 0.2,borderRadius: 50,backgroundColor:color,display: "flex",alignItems:"center",justifyContent: "center"}}>
        <Text style={{fontSize: 50,color: "white"}}>{points}</Text>
        </View>
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
    animatableRef.current.animate({0: {backgroundColor: color},1: {backgroundColor: newColor}})

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
    console.log("ye");
    if(!active){
      return;
    }
    animatableRef.current.pulse();
    setColor(generateColor());
    setTime(randomIntFromInterval(1, 5));
    _onClick(color);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View ref={animatableRef} duration={250}
        style={{
          width: Screen.Width * 0.2,
          height: Screen.Width * 0.2,
          backgroundColor: color,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
    </Animatable.View>
    </TouchableOpacity>
  );
};

export default function Game(props) {
  const { appState,setAppState } = props;
  const [gameTime,setGameTime] = useState<number>(120);
  const [countDown,setCountDown] = useState<number>(3);
  const [active,setActive] = useState<boolean>(false);
  const [sound, setSound] = useState();
  const countDownRef =  useRef<Animatable.View & View>(null);
  const [gameState,setGameState] = useState("oneColor");

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
        countDownRef.current.animate(countDown % 2 ? flipEven : flipOdd);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [countDown]);

  const flipEven = {
    0: {
      transform: [{rotateZ: "0deg"}],
    },
    1: {
      transform: [{rotateZ: "180deg"}],
    },
  };
  const flipOdd = {
    0: {
      transform: [{rotateZ: "180deg"}],
    },
    1: {
      transform: [{rotateZ: "360deg"}],
    },
  };

  const styles = StyleSheet.create({
    wrapper: { width: "100%", height: "100%" },
    innerWrapper: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent:"space-between"
    },
    middleWrapper: {position: "absolute",zIndex: -1,width:"100%",height:"100%",display: "flex",alignItems:"center",justifyContent:"center",transform: [{rotate:'90deg'}]},
    middleWrapperText: {fontSize: 140, fontWeight: "lighter",color: "black"},
    playerWrapper: { width: "100%", height: "50%" }
  });
  return (
    <>
    <SafeAreaView style={styles.wrapper}>
      <View
        style={styles.innerWrapper}
      >
      <View style={styles.middleWrapper}>
          <Text style={styles.middleWrapperText}>{gameTime}</Text>
      </View>

        <View style={styles.playerWrapper}>
          <PlayerController gameState={gameState} active={active} player="P1" />
        </View>
        <View style={styles.playerWrapper}>
          <PlayerController gameState={gameState} active={active} player="P2" />
        </View>
      </View>
    </SafeAreaView>
      <View style={{display: !active ? "flex" : "none",position: "absolute",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
        <Animatable.View ref={countDownRef} animation="flipInY" iterationCount={1} style={{width: Screen.Width * 0.9,height:Screen.Width * 0.9,backgroundColor:"black",borderRadius: Screen.Width * 0.9,display: "flex",alignItems:"center",justifyContent:"center"}}>
          <Animatable.Text duration={2000} iterationCount={4} style={{fontSize: 300,color: "white"}}>{countDown}</Animatable.Text>
        </Animatable.View>
      </View>
    </>
  );
}
