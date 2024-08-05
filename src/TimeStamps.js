
export function timeStamps (timestamp, timezoneOffset) {
    const date = new Date((timestamp * 1000) + (timezoneOffset * 1000));
    return date.toLocaleTimeString();
}