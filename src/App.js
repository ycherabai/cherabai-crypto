import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoChart from './Components/CryptoChart';
import CryptoCurrentRate from './Components/CryptoCurrentRate';

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
    item[0] + 7200 * 1000, // add 2 hours(in ms) to have UTC+2 time
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
  const [btcCurrent, setBtcCurrent] = useState({});
  const [ethCurrent, setEthCurrent] = useState({});
  const [tonCurrent, setTonCurrent] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      const btcDataRes = await fetchData('bitcoin');
      setBtcData(btcDataRes);
      setBtcCurrent(calculateCurrent(btcDataRes));

      const ethDataRes = await fetchData('ethereum');
      setEthData(ethDataRes);
      setEthCurrent(calculateCurrent(ethDataRes));

      const tonDataRes = await fetchData('the-open-network');
      setTonData(tonDataRes);
      setTonCurrent(calculateCurrent(tonDataRes));
    };

    fetchAllData();
  }, []);

  return (
    <div className="App">
      <h1>Header1</h1>
      <CryptoCurrentRate title="BTC" current={btcCurrent} />
      <CryptoCurrentRate title="ETH" current={ethCurrent} />
      <CryptoCurrentRate title="TON" current={tonCurrent} />
      <CryptoChart data={btcData} title="Bitcoin" coinName="BTC" />
      <CryptoChart data={ethData} title="Ethereum" coinName="ETH" />
      <CryptoChart data={tonData} title="TON" coinName="TON" />
    </div>
  );
}

export default App;
