import {getApiURL} from "./util";
import axios from 'axios';

/**
 * Create Axios client for backend api
 * @type {axios.AxiosInstance}
 * @constructor
 */
export const axiosClient = axios.create({
    baseURL: `${getApiURL().href}api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

/**
 * get a valid list of stock exchanges
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStockExchanges() {
    return axiosClient.get('/market/stocks/list/exchanges');
}

/**
 * get a list of valid market identifiers
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getMarketIdentifiers() {
    return axiosClient.get('/market/stocks/list/mics');
}

/**
 * get a list of stocks for a given exchange and mic
 * @param exchange
 * @param mic
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStocks(exchange, mic) {
    return axiosClient.get(`/market/stocks/exchange=${exchange}&mic=${mic}`);
}

/**
 * search for a symbol
 * @param symbol
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStockLookup(symbol) {
    return axiosClient.get(`/market/stocks/search?symbol=${symbol}`);
}

/**
 * get a recent quote for a given symbol
 * @param symbol
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStockQuote(symbol) {
    return axiosClient.get(`/market/stocks/quote?symbol=${symbol}`);
}

/**
 * get current market news headlines
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getMarketNews() {
    return axiosClient.get('/market/stocks/news');
}

/**
 * get a list of peers in the same sector, given a symbol
 * @param symbol
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getCompanyPeers(symbol) {
    return axiosClient.get(`/market/stocks/peers?symbol=${symbol}`);
}

/**
 * get current trends from finnhub api
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getTrends() {
    return axiosClient.get('/market/stocks/recommend');
}

/**
 * Get intraday data for a given symbol
 * @param symbol
 * @param interval - 1min, 5min, 15min, 30min, 60min
 * @param outputsize - compact, full
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getIntraDayData(symbol, interval, outputsize) {
    return axiosClient.get(`/market/stocks/intraday?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}`);
}

/**
 * Get weekly data for a given symbol
 * @param symbol
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getWeeklyData(symbol) {
    return axiosClient.get(`/market/stocks/weekly?symbol=${symbol}`);
}

/**
 * Get monthly data for a given symbol
 * @param symbol
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getMonthlyData(symbol) {
    return axiosClient.get(`/market/stocks/monthly?symbol=${symbol}`);
}

/**
 *
 * @param type - specify the time frame as 'daily', 'weekly', 'monthly'
 * @param symbol - stock symbol
 * @param interval - 1min, 5min, 15min, 30min, 60min (only used w/ daily)
 * @param outputsize - compact, full (only used w/ daily)
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getTimeSeriesData(type, symbol, interval, outputsize) {
    if (type === "daily") {
        return axiosClient.get(`/market/stocks/intraday?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}`);
    }
    else if (type === "weekly") {
        return axiosClient.get(`/market/stocks/weekly?symbol=${symbol}`);
    }
    else if (type === "monthly") {
        return axiosClient.get(`/market/stocks/monthly?symbol=${symbol}`);
    }

    throw 'Error Incorrect type, please use "daily, weekly, or monthly"'
}

