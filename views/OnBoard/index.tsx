import { OnboardFlow } from 'react-native-onboard';
import {Image,Text} from "react-native";
import {AsyncStorageHelper} from "../../helpers";

export default function OnBoard({setCurrentPath}) {
    const onDone = async () => {
        await AsyncStorageHelper.set("onBoarding","1");
        const result = await AsyncStorageHelper.get("onBoarding");
        setCurrentPath("Game");

    }
    const stepOne = <Text>In this tutorial, we will walk you through the process of onboarding and getting started with a game for the first time. Whether youre a seasoned gamer or new to the gaming scene, this guide will help you navigate the initial stages and ensure a smooth and enjoyable gaming experience.</Text>
    const stepTwo = <Text style={{textAlign:"center"}}>Look at the colored squares below the upper circle and bar.
            {"\n\n"}
        Click or tap on the square that matches the color precisely. Be careful to choose the exact match.
        The game may have a time limit for each match, so make sure to act swiftly.
        </Text>;
    const stepThree:any = <Text style={{textAlign:"center"}}>Upon selecting the correct colored square, you will earn points based on your accuracy and speed.{"\n\n"}This also adds power to your power meter.{"\n"} The player with the highest points wins when the timer ends.</Text>;
    const stepFour:any = <Text style={{textAlign:"center"}}>When the power meter is filled the stop button will appear.{"\n\n"}It diables the opponent for 3 seconds, if they click on a square during the this time they loose all of their points and power.</Text>;

    return (
      <OnboardFlow
        pages={[
          {
            title: 'Welcome to the exciting world of Colors! ',
            subtitle: stepOne,
            imageUri: Image.resolveAssetSource(require('./tutorial_step_1.png')).uri,
          },
          {
            title: 'How to play the game',
            subtitle: stepTwo,
            imageUri: Image.resolveAssetSource(require('./tutorial_step_2.png')).uri,
        },
        {
          title: 'Gaining points',
          subtitle: stepThree,
          imageUri: Image.resolveAssetSource(require('./tutorial_step_3.png')).uri,
        },
        {
          title: '[STOP]',
          subtitle: stepFour,
          imageUri: Image.resolveAssetSource(require('./tutorial_step_4.png')).uri,
        }
        ]}
        type={'fullscreen'}
        onDone={onDone}
      />
    );
  };