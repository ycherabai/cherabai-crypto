import axios from "axios";

const fetchCurrencyRate = async (currencyId) => {
  const response = await axios(
    `https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days: '1',
      },
    }
  );
  return response.data.prices.map((item) => [
    item[0],
    parseFloat(item[1].toFixed(2)), // price in 2 digit after coma format
  ]);
};

export default fetchCurrencyRate;
