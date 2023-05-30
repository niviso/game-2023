import { View, Text,StyleSheet,Linking,TouchableOpacity,SafeAreaView } from "react-native";
import data from "./data";
import * as Animatable from 'react-native-animatable';

export default function Credits({ setCurrentPath }) {
  const styles = StyleSheet.create({
    wrapper:{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-between"
    },
    item: {
      marginBottom: 25,
    },
    textLink: {
      color: "blue",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16
    },
    textHeadline: {
      color: "white",
      textAlign: "center",
      fontSize: 28,
      marginBottom: 5,
    },
    textDescription: {
      color: "white",
      textAlign: "center",
      fontSize: 20,   
    },
    textTitle: {
      color: "white",
      fontSize: 30,
      padding: 10,
      textAlign: "center",
      marginBottom: 10
    },
    textTitleDescription: {
      color: "white",
      fontSize: 16,
      textAlign: "center",
      marginBottom: 15,
      width: 370,
      opacity: 0.5
    }
  });
  return (
    <View style={{backgroundColor: "black"}}>
      <SafeAreaView style={styles.wrapper}>
        <View style={{width: "100%",display: "flex",alignItems: "center",justifyContent:"center"}}>
        {
          data.map((item,index) => {
            return (
            <View style={styles.item} key={index}>
              <Text style={styles.textTitle}>{item.title.toUpperCase()}</Text>
              <Text style={styles.textTitleDescription}>{item.description}</Text>

              {item.items.map((item,index) => {
              return (
              <View key={index} style={{marginBottom: 10, display: "flex",flexDirection: "column"}}>
              <Text style={styles.textDescription}>{item.headline}</Text>
              {!item.link && <Text style={styles.textDescription}>{item.description}</Text>}
              {item.link && <TouchableOpacity onPress={() => Linking.openURL(item.link)}><Text style={styles.textLink}>{item.description}</Text></TouchableOpacity>}
              </View>
              )})
              }
            </View>
            )
          })
        }
        </View>
        <Animatable.View animation="slideInUp" duration={500} onTouchStart={() => setCurrentPath("Start")} style={{position: "absolute",bottom: 0,left: 0, backgroundColor: "white",width: 140,height:80,display: "flex",alignItems:"center",justifyContent:"center",shadowColor: '#77ADFF',shadowOffset: {width: 0, height: 0},shadowOpacity: 1,shadowRadius: 20,borderTopRightRadius: 10}}><Animatable.Text animation="pulse" iterationCount="infinite" duration={1000} delay={1000} style={{fontSize: 20,color: "black"}}>BACK</Animatable.Text></Animatable.View>

      </SafeAreaView>
      </View>
  );
}
