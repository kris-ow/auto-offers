export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// funtion converting array to CSV format
export function arrayToCSV(arr, delimiter = ',') {
    return arr.map(v => v.map(x => `${x}`).join(delimiter)).join('\n');
}