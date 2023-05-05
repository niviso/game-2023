import { View, Text,SafeAreaView, StyleSheet,TouchableOpacity } from "react-native";
import { Color, Screen, Player } from "../../constants";
import { useEffect, useState, useRef } from "react";
import { Audio } from 'expo-av';
import { MathHelper } from '../../helpers';
import { usePrevious } from "../../hooks";
import * as Animatable from 'react-native-animatable';

const generateColor = ():string => {
  const obj = Color.primary.slots;
  const keys = Object.keys(obj);
  const color = keys[Math.floor(Math.random() * keys.length)];
  return obj[color];
};

const CountDown = ({active,countDownRef, countDown}) => {
  return (
    <View style={{display: !active ? "flex" : "none",position: "absolute",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
    <Animatable.View ref={countDownRef} animation="flipInY" iterationCount={1} style={{width: Screen.Width * 0.9,height:Screen.Width * 0.9,backgroundColor:"black",borderRadius: Screen.Width * 0.9,display: "flex",alignItems:"center",justifyContent:"center"}}>
      <Animatable.Text duration={2000} iterationCount={4} style={{fontSize: 300,color: "white"}}>{countDown}</Animatable.Text>
    </Animatable.View>
  </View>
  )
}

const PrecentageBar = ({value,color,onPressStop}:any) => {
  const animatableRef = useRef<Animatable.View & View>(null);
  const prevColor = usePrevious(color);
  const prevValue = usePrevious(value);
  useEffect(() => {
    animatableRef.current && animatableRef.current.animate({0: {backgroundColor: prevColor, width: (100 - (prevValue || 0)).toString()+"%"},1: {backgroundColor: color, width: (100 - value).toString()+"%"}});

  },[color,value]);


  const styles = StyleSheet.create({
    wrapper: {position: "relative",width: Screen.Width,height: 30,backgroundColor:color},
  });

  return (
    <View style={{width: Screen.Width, display: "flex",alignItems: "center"}}>
    { value === 100 ? (
      
    <Animatable.View duration={250} ref={animatableRef} style={styles.wrapper}/>
    ) : (
    <TouchableOpacity onPress={onPressStop}>
    <Animatable.View duration={500} animation="flipInX" style={{display: "flex",justifyContent:"center",alignItems:"center",width: Screen.Width * 0.5,height: Screen.Height * 0.1,backgroundColor: color, borderRadius: 10}}>
      <Animatable.Text duration={1000} animation="pulse" iterationCount="infinite" style={{color:"white",fontSize: 50}}>STOP</Animatable.Text>
    </Animatable.View>
    </TouchableOpacity>
    )}
    </View>
  )
}

const PlayerController = (props) => {
  const { player,active,setGameState,gameState } = props;
  const [points,setPoints] = useState<number>(0);
  const [powerMeter,setPowerMeter] = useState<number>(0);
  const [time,setTime] = useState<number>(MathHelper.randomIntFromInterval(2, 10));
  const [color,setColor] = useState<string>(generateColor());


  const onClick = (clickColor:string,player:string)=> {
    if(gameState.blocked === player){
      setPowerMeter(0);
      setPoints(0);
    }
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
        setTime(MathHelper.randomIntFromInterval(1, 5));
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
      flexDirection: player == Player.One ? "column" : "column-reverse",
      justifyContent: "space-between",
    },
    innerWrapper: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: player == Player.One ? "flex-start" : "flex-end",
      justifyContent: "space-between",
      padding: 10,
    }
  });

  const blockPlayer = () => {
    setGameState({...gameState,blocked: player === Player.One ? Player.Two : Player.One})
  }

  return (
    <View style={styles.wrapper}>

      <View
        style={styles.innerWrapper}
      >
        <ColorPad gameState={gameState} player={player} active={active} _onClick={onClick} />
        <ColorPad gameState={gameState} player={player} active={active} _onClick={onClick} />
        <ColorPad gameState={gameState} player={player} active={active} _onClick={onClick} />
        <ColorPad gameState={gameState} player={player} active={active} _onClick={onClick} />
        
      </View>
      <PrecentageBar onPressStop={blockPlayer} value={powerMeter} color={color}/>

      <View style={{display: "flex",flexDirection: player == Player.One ? "column-reverse" : "column",alignItems:"center",justifyContent: player == Player.One ? "flex-end" : "flex-start"}}>
      <View style={{transform: [ {rotate: player == Player.One ? '180deg' : '0deg'}]}}>
        
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
  const { _onClick, active, player, gameState } = props;

  const [color, setColor] = useState(gameState.mode === "oneColor" ? "black" : generateColor());
  const [time, setTime] = useState(0);
  const [seed,setSeed] = useState(0);
  const animatableRef = useRef<Animatable.View & View>(null); 
  
  const getSeedColor = () => {
    if(seed == 0){
      setSeed(1);
      return Color.primary.slots.slot_01;
    } else if(seed == 1){
      setSeed(2);
      return Color.primary.slots.slot_02;
    } else if(seed == 2){
      setSeed(3);
      return Color.primary.slots.slot_03;
    } else if(seed == 3){
      setSeed(0);
      return Color.primary.slots.slot_04;
    }
  }
  const updateColor = () => {
    const newColor = gameState.mode == "oneColor" ? getSeedColor() : generateColor();

      if(newColor === color && gameState.mode !== "oneColor") {
        updateColor();
      }
      setColor(newColor);
    animatableRef.current.animate({0: {backgroundColor: color},1: {backgroundColor: newColor}})

  }
  useEffect(() => {
    let intervall = setInterval(() => {
      if (time == 0) {
        updateColor();
        setTime(gameState.mode == "oneColor" ? 1 : MathHelper.randomIntFromInterval(1, 3));
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
    setTime(gameState.mode == "oneColor" ? 1 : MathHelper.randomIntFromInterval(1, 5));
    _onClick(color,player);
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
        {gameState.blocked === player && (
            <Text style={{fontSize: 50,color: "white"}}>⨉</Text>
            )}
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
  const [gameState,setGameState] = useState<any>({mode: "oneColor",blocked: null});

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
    setTimeout(()=> {
      if (countDown == 0) {
        countDownRef.current && countDownRef.current.flipOutY();
        setGameState({...gameState,mode: ""})
        setTimeout(() => {
          setActive(true);
        },1000);
      } else {
        setCountDown(countDown - 1);
        countDownRef.current.animate(countDown % 2 ? flipEven : flipOdd);
      }
    }, 1000);
  }, [countDown]);

  useEffect(() => {
    if(gameState.blocked){
      setTimeout(() => {
        setGameState({...gameState,blocked: null});
      },3000);
    }
  },[gameState]);

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
    middleWrapperText: {fontSize: 140, fontWeight: "100",color: "black"},
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
          <PlayerController setGameState={setGameState} gameState={gameState} active={active} player={Player.One} />
        </View>
        <View style={styles.playerWrapper}>
          <PlayerController setGameState={setGameState} gameState={gameState} active={active} player={Player.Two} />
        </View>
      </View>
    </SafeAreaView>

    <CountDown countDownRef={countDownRef} active={active} countDown={countDown}/>
    </>
  );
}
