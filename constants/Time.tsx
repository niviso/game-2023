const Time = {
    second: 1000,
    getSeconds: (seconds:number) => {
        return Time.second * seconds;
    },
    getMinutes:(minutes:number) => {
        return ((Time.second * 60) * minutes);
    }
}
export default Time;