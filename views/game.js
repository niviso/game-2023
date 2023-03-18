import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Style } from "../constant";
import { useEffect, useState, useRef } from "react";

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
          backgroundColor: "red",
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
          backgroundColor: "red",
        }}
      />
    </View>
  );
};

const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();
  /**
   * The callback function is automatically passed a timestamp indicating
   * the precise time requestAnimationFrame() was called.
   */

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
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
        <Color _onClick={onClick} />
        <Color _onClick={onClick} />
        <Color _onClick={onClick} />
        <Color _onClick={onClick} />
      </View>
      <View style={{ width: "100%", height: 20, backgroundColor: "black" }} />
    </View>
  );
};

const Color = (props) => {
  const { _onClick } = props;
  const generateColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const [color, setColor] = useState(generateColor());
  const [time, setTime] = useState(randomIntFromInterval(1, 10));
  useEffect(() => {
    let intervall = setInterval(() => {
      if (time == 0) {
        console.log("UPDATE");
        setColor(generateColor());
        setTime(randomIntFromInterval(1, 10));
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
    setTime(randomIntFromInterval(1, 10));
    _onClick();
  };
  return (
    <>
      <TouchableOpacity
        onPress={update}
        style={{
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").width * 0.2,
          backgroundColor: "#" + color,
          borderRadius: 10,
        }}
      />
    </>
  );
};

export default function Game({ route, appState }) {
  const [deltaTime, setDeltaTime] = useState(0);
  const [time, setTime] = useState(0);

  useAnimationFrame((deltaTime) => {
    setTime((prevTime) => prevTime + Math.round(deltaTime));
    setDeltaTime(Math.round(deltaTime));
  });

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          position: "fixed",
          background: "lightgrey",
          bottom: 0,
          right: 0,
          width: 200,
          height: 200,
          display: "none",
        }}
      >
        <Text style={{ fontSize: 30, color: "red" }}>FPS: {deltaTime}</Text>
        <Text style={{ fontSize: 30, color: "red" }}>time: {time / 1000}</Text>
      </View>
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
            backgroundColor: "rgba(0,0,0,0.1)",
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
