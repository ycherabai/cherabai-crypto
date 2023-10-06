import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoChart from './Components/CryptoChart';

const fetchData = async (currencyId) => {
  const result = await axios(
    `https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days: '1',
      },
    }
  );
  return result.data.prices.map((item) => [
    item[0],
    parseFloat(item[1].toFixed(2)), // price in 2 digit after coma format
  ]);
};

const calculateCurrent = (data) => {
  const current = data[data.length - 1][1];
  const pnl = (current / data[0][1]) * 100 - 100;
  return { current: current, pnl: parseFloat(pnl.toFixed(2)) };
};

function App() {
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [tonData, setTonData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setBtcData(await fetchData('bitcoin'));
      setEthData(await fetchData('ethereum'));
      setTonData(await fetchData('the-open-network'));
    };

    fetchAllData();

    const intervalId = setInterval(() => {
      fetchAllData();
    }, 180 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <br/>
      <CryptoChart data={btcData} title="Bitcoin" coinName="BTC" />
      <br/>
      <CryptoChart data={ethData} title="Ethereum" coinName="ETH" />
      <br/>
      <CryptoChart data={tonData} title="TON" coinName="TON" />
      <br/>
    </div>
  );
}

export default App;
