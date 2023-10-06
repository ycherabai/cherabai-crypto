import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRateChart from './Components/CurrencyRateChart';
import fetchCurrencyRate from "./api/coingecko-api";

function App() {
  const [currencyRates, setCurrencyRates] = useState({
    btcRate: [],
    ethRate: [],
    tonRate: []
  })

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      const btcRate = await fetchCurrencyRate('bitcoin');
      const ethRate = await fetchCurrencyRate('ethereum');
      const tonRate = await fetchCurrencyRate('the-open-network');
      setCurrencyRates({
        btcRate: btcRate,
        ethRate: ethRate,
        tonRate: tonRate
      })
    };

    fetchCurrencyRates();

    const intervalId = setInterval(() => {
      fetchCurrencyRates();
    }, 180 * 1000); // update every 3 min

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <br/>
      <CurrencyRateChart rate={currencyRates.btcRate} coinName="BTC" />
      <br/>
      <CurrencyRateChart rate={currencyRates.ethRate} coinName="ETH" />
      <br/>
      <CurrencyRateChart rate={currencyRates.tonRate} coinName="TON" />
      <br/>
    </div>
  );
}

export default App;
