const base_url = "https://finnhub.io/api/v1";

async function searchBySymbol(query, apiKey) {
    const url = `${base_url}/search?q=${query}&token=${apiKey}`
    const res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

async function getStocks(exchange = 'US', mic = 'XNYS', apiKey) {
    const url = `${base_url}/stock/symbol?exchange=${exchange}&token=${apiKey}`;
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    } else {
        console.log(res.status);
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

async function getCompanyPeers(symbol, grouping, apiKey) {
    const url = `${base_url}/stock/peers?symbol=${symbol}&token=${apiKey}`
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

async function getMarketNews(category, apiKey) {
    const url = `${base_url}/news?category=${category}&token=${apiKey}`;
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

async function getQuote(symbol, apiKey) {
    const url = `${base_url}/quote?symbol=${symbol}&token=${apiKey}`;
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;

}

async function getCryptoExchanges(apiKey) {
    const url = `${base_url}/crypto/exchange&token=${apiKey}`;
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

async function getCryptoSymbols(exchange = 'binance', apiKey) {
    const url = `${base_url}/crypto/symbol?exchange=${exchange}&token=${apiKey}`;
    let res = await fetch(url, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    throw `[Error]: ${res.status} from finnhub api: ${url}`;
}

module.exports = {
    searchBySymbol,
    getStocks,
    getCompanyPeers,
    getMarketNews,
    getQuote,
    getCryptoExchanges,
    getCryptoSymbols,
}