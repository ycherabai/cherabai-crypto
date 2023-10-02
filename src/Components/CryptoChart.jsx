import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './CryptoChart.styles.css';

const CryptoChart = (props) => {
  const chartOptions = {
    chart: {
      type: 'line',
      zoomType: 'x',
      backgroundColor: 'transparent',
    },
    title: {
      text: props.title,
      style: {
        color: 'rgb(207, 207, 207)',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%H:%M}',
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return `$${this.value}`;
        },
      },
    },
    rangeSelector: {
      buttons: [
        {
          type: 'minute',
          count: 15,
          text: '15min',
        },
        {
          type: 'minute',
          count: 30,
          text: '30min',
        },
        {
          type: 'hour',
          count: 1,
          text: '1hr',
        },
        {
          type: 'hour',
          count: 3,
          text: '3hr',
        },
        {
          type: 'hour',
          count: 6,
          text: '6hr',
        },
        {
          type: 'hour',
          count: 12,
          text: '12hr',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      inputEnabled: false,
      selected: 4,
    },
    series: [
      {
        name: props.coinName,
        data: props.data,
        color: '#28a745',
      },
    ],
  };

  return (
    <>
      {props.data.length < 0 && <h1>Loading...</h1>}
      {props.data.length > 0 && (
        <HighchartsReact
          constructorType={'stockChart'}
          options={chartOptions}
          highcharts={Highcharts}
        />
      )}
    </>
  );
};

export default CryptoChart;
