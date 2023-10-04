import './Tooltip.styles.css'

const Tooltip = ({data}) => {

  return (
    <div className="tooltip">
      <h2>{data.price}</h2>
    </div>
  )
}

export default Tooltip;
