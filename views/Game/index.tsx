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

const PrecentageBar = ({value}:any) => {
  return (
    <View style={{position: "relative",width: "100%",height: 20,backgroundColor:"black"}}>
      <View style={{position:"absolute",width: 20,height:20,backgroundColor: "red"}}/>
    </View>
  )
}

const PlayerController = (props) => {
  const { player } = props;
  const [points,setPoints] = useState<number>(0);
  const [powerMeter,setPowerMeter] = useState<number>(0);
  const [time,setTime] = useState<number>(randomIntFromInterval(2, 10));
  const [color,setColor] = useState<string>(generateColor());


  const onClick = (clickColor:string): void => {
    if(clickColor === color) {
      setPoints((prevPoints) => (prevPoints + 1));
      setPowerMeter((prevPowerMeter) => (prevPowerMeter + 1));
    } else if(points > 0) {
      setPoints((prevPoints) => (prevPoints - 1))
    }
  };

  useEffect(() => {
    let intervall:any = setInterval((): void => {
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
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
        
      </View>
      <PrecentageBar/>
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
  const { _onClick } = props;

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

export default function Game({ route, appState }) {
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
        <View style={{ width: "100%", height: "50%" }}>
          <PlayerController player="P1" />
        </View>
        <View style={{width: "100%", height: "50%" }}>
          <PlayerController player="P2" />
        </View>
      </View>
    </View>
  );
}
