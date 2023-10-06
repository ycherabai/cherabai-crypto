import moment from "moment";

import './Tooltip.styles.css'

const calculatePnL = (data) => {
  if (data.length <= 0) {
    return {
      pnl: '',
      pnlPercent: '',
      isPositive: true
    }
  }

  const left = data[0][1]
  const right = data[data.length - 1][1]

  const pnl = Math.abs(right - left).toFixed(2);
  const pnlPercent = ((right / left) * 100 - 100).toFixed(2);
  let pnlPercentStr = ''

  if (pnlPercent > 0) {
    pnlPercentStr = `+ ${pnlPercent}%`
  } else if (pnlPercent < 0) {
    pnlPercentStr = `- ${pnlPercent * -1}%`
  } else {
    pnlPercentStr = '0.00%';
  }

  return {
    pnl: pnl,
    pnlPercent: pnlPercentStr,
    isPositive: pnlPercent >= 0
  }
};

const Tooltip = ({currentRangeData,   data}) => {

  const date = moment(data.timestamp).format('ddd, DD MMM HH:mm');

  const pnlData = calculatePnL(currentRangeData)

  return (

    <div className="tooltip">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <b style={{fontSize: '1.4rem', color: 'white'}}>$ {data.price ? data.price.toFixed(2) : ''}</b>
        <h3 style={{margin: 0, marginRight: '0.5rem'}}>{data.name}</h3>
      </div>
      {currentRangeData.length > 0 &&
        <div style={{marginBottom: '0.5rem', marginTop: '0.5rem', display: "flex", justifyContent: "left"}}>
          <div style={{color: `${pnlData.isPositive ? '#39cc83' : '#fe4766'}`}}>
            {pnlData.pnlPercent}
          </div>
          <div style={{color: `${pnlData.isPositive ? '#216249' : '#742b3d'}`, marginLeft: '0.5rem'}}>
            ${pnlData.pnl}
          </div>
        </div>
        // <p style={{marginBottom: '0.5rem', marginTop: '0.5rem', color: `${pnlData.isPositive ? 'green' : 'red'}`}}>
        //   {pnlData.pnlPercent} ${pnlData.pnl}
        // </p>
      }
      <p style={{marginBottom: '1rem', marginTop: '0.5rem'}}>{date}</p>
    </div>
  )
}

export default Tooltip;
