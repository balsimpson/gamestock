const alphaVantage = {
  search: async query => {
    let url = `https://query1.finance.yahoo.com/v1/finance/search?q=${query}`;
    // let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=YS05GMVH1ELVKYEO`;
    let result = doFetch;
    return result;
  },
  // company data
  // type - OVERVIEW | EARNINGS | INCOME_STATEMENT | BALANCE_SHEET | CASH_FLOW
  getCompanyInfo: (symbol, type = "OVERVIEW") => {
    let url = `https://www.alphavantage.co/query?function=${type.toUpperCase()}&symbol=${symbol}&apikey=YS05GMVH1ELVKYEO`;
  },

  getIntraday: symbol => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&apikey=YS05GMVH1ELVKYEO`;
  },

  getDaily: symbol => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YS05GMVH1ELVKYEO`;
  },

  getQuote: symbol => {
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YS05GMVH1ELVKYEO`;
  }
};

async function doFetch(url) {
  let res = await fetch(url);
  let result = await res.json();

  return result;
}
export default alphaVantage;
