import { Dimensions } from "react-native";

enum Screen {
    Width =  Dimensions.get("window").width,
    Height =  Dimensions.get("window").height,
}

export default Screen;