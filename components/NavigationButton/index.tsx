import * as Animatable from 'react-native-animatable';
import { StyleSheet } from "react-native";
import { Color,Direction } from "../../constants";

export default function NavigationButton({onClick,direction,title,shadowColor,textColor}:any){
    const styles = StyleSheet.create({
        wrapper: {
            position: "absolute",
            bottom: 0,
            left: direction === Direction.Left ? 0 : null,
            right: direction === Direction.Right ? 0 : null,
            backgroundColor: Color.white,
            width: 140,
            height:80,
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            shadowColor: shadowColor || Color.black,
            shadowOffset: {width: 0,height: 0},
            shadowOpacity: 0.5,
            shadowRadius: 10,
            borderTopLeftRadius: direction === Direction.Right ? 10 : 0,
            borderTopRightRadius: direction === Direction.Left ? 10 : 0
        },
        text: {
            fontSize: 20,
            color: textColor || Color.black
        }
    });
return (
    <Animatable.View animation="slideInUp" duration={500} onTouchStart={onClick} style={styles.wrapper}>
        <Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={styles.text}>{title.toUpperCase()}</Animatable.Text>
    </Animatable.View>
)
}