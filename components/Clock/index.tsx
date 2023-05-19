import {Text,StyleSheet} from "react-native";
import { Screen } from "../../constants";
export default function Clock({time}){
    const styles = StyleSheet.create({
      middleWrapperText: {fontSize: Screen.Width * 0.2, fontWeight: "100",color: "black"},
    });
    return <Text style={styles.middleWrapperText}>{time}</Text>
  }