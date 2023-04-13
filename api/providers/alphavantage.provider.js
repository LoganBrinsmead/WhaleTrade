const base_url = "https://alphavantage.co"


/*
interval: 1min, 5min, 15min, 30min, 60min
outputsize: compact, full
*/
async function getIntraDayData(symbol, interval, outputsize, apikey) {
    const url = `${base_url}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apikey}`;
    const res = await fetch(url, {
        method: 'GET'
    });
    if (res.ok) {
        return res.json();
    }
    throw `[ERROR]: ${res.status} from alpha vantage api: ${url}`;
}

async function getWeeklyData(symbol, apikey) {
    const url = `${base_url}/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apikey}`
    const res = await fetch(url, {
        method: 'GET'
    });
    if (res.ok) {
        return res.json();
    }
    throw `[ERROR]: ${res.status} from alpha vantage api: ${url}`;
}

async function getMonthlyData(symbol, apikey) {
    const url = `${base_url}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apikey}`
    const res = await fetch(url, {
        method: 'GET'
    });
    if (res.ok) {
        return res.json();
    }
    throw `[ERROR]: ${res.status} from alpha vantage api: ${url}`;
}

module.exports = {
    getIntraDayData,
    getWeeklyData,
    getMonthlyData,
}