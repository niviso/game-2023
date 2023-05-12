import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { AppContext } from "../../contexts";
const Link = ({ to, children, style }) => {
  const [appState, setAppState] = useContext(AppContext);
  const loadScreen = () => {
    setAppState({ ...appState, path: to });
  };
  return (
    <TouchableOpacity onPress={loadScreen} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default Link;
