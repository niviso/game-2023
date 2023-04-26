import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Color } from "@/constants";
import { useEffect, useState } from "react";
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
    <View style={{position: "relative",width: "100%",height: 20,backgroundColor:"black"}}>
      <View style={{position:"absolute",width: value.toString()+"%",height:20,backgroundColor: color}}/>
    </View>
  )
}

const PlayerController = (props) => {
  const { player,appState } = props;
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
        <ColorPad active={appState.gameActive} _onClick={onClick} />
        <ColorPad active={appState.gameActive} _onClick={onClick} />
        <ColorPad active={appState.gameActive} _onClick={onClick} />
        <ColorPad active={appState.gameActive} _onClick={onClick} />
        
      </View>
      <PrecentageBar value={powerMeter} color={color}/>
      <View style={{ display:"none",width: "100%", height: 20, backgroundColor: "black" }} />

      <View style={{display: "flex",flexDirection: player == "P1" ? "column-reverse" : "column",alignItems:"center",justifyContent: player == "P1" ? "flex-end" : "flex-start"}}>
      <View style={{transform: player == "P1" ? "rotate(180deg)" : "rotate(0deg)"}}>
        
        <View style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
        <Text style={{width:80,fontSize: 60,marginTop: -100,textAlign: "left"}}>{points}</Text>
        <View style={{width: 1,height:100,backgroundColor: "black"}}/>
        <Text style={{width:80,fontSize: 14}}></Text>
        

        </View>
        </View>
        <View style={{width: 70,height: 70,borderRadius: 50,backgroundColor:color,display: "flex",alignItems:"center",justifyContent: player == "P1" ? "flex-end" : "flex-start"}}>
      </View>
      </View>
    </View>
  );
};

const ColorPad = (props) => {
  const { _onClick, active } = props;

  const [color, setColor] = useState(generateColor());
  const [time, setTime] = useState(randomIntFromInterval(1, 5));
  useEffect(() => {
    let intervall = setInterval(() => {
      if (time == 0) {
        setColor(generateColor());
        setTime(randomIntFromInterval(1, 5));
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
    setColor(generateColor());
    setTime(randomIntFromInterval(1, 5));
    _onClick(color);
  };
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").width * 0.2,
          backgroundColor: color,
          borderRadius: 10,
        }}
      />
    </>
  );
};

export default function Game(props) {
  const { appState,setAppState } = props;
  const [gameTime,setGameTime] = useState<number>(5);
  const [countDown,setCountDown] = useState<number>(3);
  const [active,setActive] = useState(false);
  const [paused,setPaused] = useState(false);
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
        setActive(true);
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [countDown]);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-between"
        }}
      >
      <View style={{position: "absolute",zIndex: -1,width:"100%",height:"100%",display: "flex",alignItems:"center",justifyContent:"center",transform: "rotate(90deg)"}}>
          <Text style={{fontSize: 170,color: "black",opacity: 0.1}}>{gameTime}</Text>
      </View>

        <View style={{ width: "100%", height: "50%" }}>
          <PlayerController {...props} player="P1" />
        </View>
        <View style={{width: "100%", height: "50%" }}>
          <PlayerController {...props} player="P2" />
        </View>
      </View>
      {!active && (
      <View style={{position: "absolute",width:"100%",height:"100%",display: "flex",alignItems:"center",justifyContent:"center"}}>
        <View style={{width: 400,height:400,backgroundColor:"black",borderRadius: 400,opacity: 0.9,display: "flex",alignItems:"center",justifyContent:"center"}}>
          <Text style={{fontSize: 200,color: "white"}}>{countDown}</Text>
        </View>
      </View>
      )}
    </View>
  );
}
