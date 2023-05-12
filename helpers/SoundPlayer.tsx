import { Audio } from 'expo-av';
class SoundPlayer {
    soundObj: any;
    audio: any;
    loop: boolean;
    muted: boolean;
    ready: boolean;
    constructor(audio,loop){
      this.soundObj = null;
      this.audio = audio; 
      this.loop = loop;
      this.muted = false;
      this.ready = false;
      this.init();
    }
    async init(){

      const {sound} = await Audio.Sound.createAsync(this.audio);
      this.soundObj = sound;
      this.ready = true;
    }
    async play() {
      if(!this.ready){
        return;
      }
      await this.soundObj.replayAsync();
      if(this.loop){
        await this.soundObj.setIsLoopingAsync(true);
      }
    }
    async setVolume(value){
      await this.soundObj.setVolumeAsync(value);
  
    }
    async setMute(value) {
      await this.soundObj.setIsMutedAsync(value);
    }
    async destory(){
      await this.soundObj.unloadAsync();
    }
    
  }
  
  const stopSound = new SoundPlayer(require("./stop.mp3"),false);
  const startSound = new SoundPlayer(require("./start.mp3"),false);
  const normalSound = new SoundPlayer(require("./normal_layer.mp3"),true);
  const clockSound = new SoundPlayer(require("./bgm.mp3"),true);
  const startBgmSound = new SoundPlayer(require("./start_bgm.mp3"),true);
  export {stopSound,startSound,startBgmSound,normalSound,clockSound}
  