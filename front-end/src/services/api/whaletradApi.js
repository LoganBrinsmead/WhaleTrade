import {getApiURL} from "./util";
import axios from 'axios';


export const axiosClient = axios.create({
    baseURL: `${getApiURL().href}api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export function getStockExchanges() {
    return axiosClient.get('/market/stocks/list/exchanges');
}

export function getMarketIdentifiers() {
    return axiosClient.get('/market/stocks/list/mics');
}

export function getStocks(exchange, mic) {
    return axiosClient.get(`/market/stocks/exchange=${exchange}&mic=${mic}`);
}

export function getStockLookup(symbol) {
    return axiosClient.get(`/market/stocks/search?symbol=${symbol}`);
}

export function getStockQuote(symbol) {
    return axiosClient.get(`/market/stocks/quote?symbol=${symbol}`);
}

export function getMarketNews() {
    return axiosClient.get('/market/stocks/news');
}

export function getCompanyPeers(symbol) {
    return axiosClient.get(`/market/stocks/peers?symbol=${symbol}`);
}

export function getTrends() {
    return axiosClient.get('/market/stocks/recommend');
}

/*
interval: 1min, 5min, 15min, 30min, 60min
outputsize: compact, full
*/
export function getIntraDayData(symbol, interval, outputsize) {
    return axiosClient.get(`/market/stocks/intraday?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}`);
}

export function getWeeklyData(symbol) {
    return axiosClient.get(`/market/stocks/weekly?symbol=${symbol}`);
}

export function getMonthlyData(symbol) {
    return axiosClient.get(`/market/stocks/monthly?symbol=${symbol}`);
}


