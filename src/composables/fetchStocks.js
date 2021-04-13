const fetchStocks = {
  async searchSome(query) {
    let url = `https://wrapapi.com/use/balsimpson/feeds/stockSearch/latest?query=${query}&wrapAPIKey=rnobhyu0QNyehnOCXtY1y7yatP4CkjKF`;
    return await doFetch(url);
  },

  async searchNews(query) {
    let url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=33185ced927f474dad697fdb7e27869f`;
    return await doFetch(url);
  },

  async details(symbol, interval = "1m", range = "1d") {
    let url = `https://wrapapi.com/use/balsimpson/feeds/stock/latest?interval=${interval}&symbol=${symbol}&range=${range}&wrapAPIKey=rnobhyu0QNyehnOCXtY1y7yatP4CkjKF`;
    return await doFetch(url);
  }
};

async function doFetch(url) {
  try {
    let res = await fetch(url);
    let result = await res.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export default fetchStocks;
