import { useEffect } from "react";
import { Audio } from "expo-av";

export default function AudioHelper({ file }) {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(file);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
}
