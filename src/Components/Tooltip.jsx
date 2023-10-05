import moment from "moment";

import './Tooltip.styles.css'

const Tooltip = ({data}) => {

  const date = moment(data.timestamp).format('ddd, DD MMM HH:mm');

  return (

    <div className="tooltip">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <b style={{fontSize: '1.4rem', color: 'white'}}>$ {data.price ? data.price.toFixed(2) : ''}</b>
        <h3 style={{margin: 0, marginRight: '0.5rem'}}>{data.name}</h3>
      </div>
      <p style={{marginBottom: '1rem', marginTop: '0.5rem'}}>{date}</p>
    </div>
  )
}

export default Tooltip;
