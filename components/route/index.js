import { useContext } from "react";
import { AppContext } from "../../contexts";

import { View } from "react-native";
const Route = ({ path, component, currentPath, setCurrentPath }) => {
  return (
    <View name={path}>
      {currentPath == path && component({ setCurrentPath: setCurrentPath })}
    </View>
  );
};

export default Route;
