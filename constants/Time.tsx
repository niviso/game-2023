const Time = {
    second: 1,
    msMultiplier: 1000,
    seconds: (multiplier:number) => {

    },
    getSeconds: (multiplier:number,inMs=false) => {
        return Time.second * multiplier;
    },
    getSecondsInMs: (multiplier:number) => {
        return Time.msMultiplier * multiplier;
    },
    getMinutes:(multiplier:number,inMs=false) => {
        return ((Time.second * 60) * multiplier);
    },
}
export default Time;