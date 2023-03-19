import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Style, Color } from "../constant";
import { useEffect, useState, useRef } from "react";
const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateColor = () => {
  const obj = Color.primary.slots;
  const keys = Object.keys(obj);
  const color = keys[Math.floor(Math.random() * keys.length)];
  return obj[color];
};

const TimeBar = (props) => {
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: 10,
        backgroundColor: "red",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "orange",
        }}
      />
    </View>
  );
};

const Player = (props) => {
  const [playerData, setPlayerData] = useState({
    time: randomIntFromInterval(1, 5),
    color: generateColor(),
  });
  useEffect(() => {
    let intervall = setInterval(() => {
      if (playerData.time == 0) {
        setPlayerData({
          ...playerData,
          time: randomIntFromInterval(1, 5),
          color: generateColor(),
        });
      } else {
        setPlayerData({
          ...playerData,
          time: playerData.playerOne.time - 1,
        });
      }
    }, 1000);
    return () => {
      clearInterval(intervall);
    };
  }, [playerData]);
};
const GameField = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        ...Style.flexCenter,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "red", //gameData.playerOne.color,
        }}
      />
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ fontSize: 80, transform: [{ rotateZ: "180deg" }] }}>
          2
        </Text>
        <View
          style={{
            width: 1,
            height: 150,
            backgroundColor: "black",
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 80 }}>5</Text>
      </View>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "red", //gameData.playerOne.color,
        }}
      />
    </View>
  );
};

const PlayerController = (props) => {
  const { player } = props;
  const onClick = () => {
    console.log("CLICK", player);
  };
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        widht: "100%",
        flexDirection: player == "P1" ? "column" : "column-reverse",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: player == "P1" ? "flex-end" : "flex-start",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
        <ColorPad _onClick={onClick} />
      </View>

      <View style={{ width: "100%", height: 20, backgroundColor: "black" }} />
      <TimeBar />
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

  const update = () => {
    setColor(generateColor());
    setTime(randomIntFromInterval(1, 5));
    _onClick();
  };
  return (
    <>
      <TouchableOpacity
        onPress={update}
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
        }}
      >
        <View style={{ width: "100%", height: 150 }}>
          <PlayerController player="P1" />
        </View>

        <View
          style={{
            height: Dimensions.get("window").height - 300,
            width: "100%",
          }}
        >
          <GameField />
        </View>
        <View style={{ width: "100%", height: 150 }}>
          <PlayerController player="P2" />
        </View>
      </View>
    </View>
  );
}
