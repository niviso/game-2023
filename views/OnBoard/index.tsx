import { OnboardFlow } from 'react-native-onboard';
import {Image,Text} from "react-native";
import {AsyncStorageHelper} from "../../helpers";
import i18n from "../../locales";

export default function OnBoard({setRoute}) {
    const onDone = async () => {
        await AsyncStorageHelper.set("onBoarding","1");
        const result = await AsyncStorageHelper.get("onBoarding");
        setRoute({path:"Game",data:{}});

    }
    return (
      <OnboardFlow
        pages={[
          {
            primaryButtonTitle: i18n.t("view.onBoard.next"),
            title: i18n.t("view.onBoard.step_1.title"),
            subtitle: i18n.t("view.onBoard.step_1.description"),
            imageUri: Image.resolveAssetSource(require('./tutorial_step_1.png')).uri,
          },
          {
            primaryButtonTitle: i18n.t("view.onBoard.next"),
            title: i18n.t("view.onBoard.step_2.title"),
            subtitle: i18n.t("view.onBoard.step_2.description"),
            imageUri: Image.resolveAssetSource(require('./tutorial_step_2.png')).uri,
        },
        {
          primaryButtonTitle: i18n.t("view.onBoard.next"),
          title: i18n.t("view.onBoard.step_3.title"),
          subtitle: i18n.t("view.onBoard.step_3.description"),
          imageUri: Image.resolveAssetSource(require('./tutorial_step_3.png')).uri,
        },
        {
          primaryButtonTitle: i18n.t("view.onBoard.start"),
          title: i18n.t("view.onBoard.step_4.title"),
          subtitle: i18n.t("view.onBoard.step_4.description"),
          imageUri: Image.resolveAssetSource(require('./tutorial_step_4.png')).uri,
        }
        ]}
        type={'fullscreen'}
        onDone={onDone}
        
      />
    );
  };