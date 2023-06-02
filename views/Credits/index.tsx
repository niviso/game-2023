import { View, Text,StyleSheet,Linking,TouchableOpacity,SafeAreaView } from "react-native";
import data from "./data";
import { NavigationButton } from "../../components";
import { Direction,generateColor } from "../../constants";
import i18n from "../../locales";
export default function Credits({ setRoute }) {
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
        <NavigationButton title={i18n.t("button.back")} direction={Direction.Left} shadowColor={generateColor} onClick={() => setRoute({path:"Start",data:{}})}/>
      </SafeAreaView>
      </View>
  );
}
