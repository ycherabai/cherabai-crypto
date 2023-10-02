import './CryptoCurrentRate.styles.css';

const CryptoCurrentRate = ({ title, current: { current, pnl } }) => {
  const pnlColor = pnl < 0 ? 'red' : 'green';

  return (
    <div>
      <h2 className="inline-heading">
        {title}: {current}$
      </h2>
      <h2 className="inline-heading" style={{ color: pnlColor }}>
        PnL: {pnl}%
      </h2>
    </div>
  );
};

export default CryptoCurrentRate;
