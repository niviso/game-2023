const Time = {
    second: 1000,
    getSeconds: (seconds:number) => {
        return Time.second * seconds;
    }
}
export default Time;