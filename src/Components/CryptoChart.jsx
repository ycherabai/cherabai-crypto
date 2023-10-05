import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './CryptoChart.styles.css';
import {useEffect, useMemo, useState} from "react";
import Tooltip from "./Tooltip";

const setDefaultTooltipData = (name, data, setTooltipData) => {
  if (data.length > 0) {
    const lastPoint = data[data.length - 1];
    setTooltipData({
      name: name,
      timestamp: lastPoint[0],
      price: lastPoint[1]
    });
  }
}

const CryptoChart = (props) => {
  const [tooltipData, setTooltipData] = useState({})

  useEffect(() => {
    setDefaultTooltipData(props.coinName, props.data, setTooltipData)
  }, [props.data, props.coinName]);

  const chartOptions = {
    chart: {
      type: 'line',
      zoomType: 'x',
      backgroundColor: '#151c29',
      height: '70%',
      marginTop: 11
    },
    title: {
      text: '',
      style: {
        color: 'rgb(207, 207, 207)',
      },
    },
    tooltip: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      lineColor: 'transparent',
      tickColor: 'transparent',
      labels: {
        format: '{value:%H:%M}',
      },
      crosshair: {
        width: 0.6,
        color: '#45AEF5'
      }
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function() {
              setTooltipData({
                name: this.series.name,
                timestamp: this.x,
                price: this.y
              })
            },
            mouseOut: function() {
              setDefaultTooltipData(props.coinName, props.data, setTooltipData)
            }
          }
        },
        marker: {
          enabled: false,
          fillColor: '#45AEF5',
          lineWidth: 0,
          lineColor: 'transparent',
          radius: 4
        }
      }
    },
    yAxis: {
      endOnTick: true,
      startOnTick: true,
      labels: {
        formatter: function () {
          return `$ ${this.value}`;
        },
        style: {
          color: '#858a93e8'
        }
      },
      tickPositioner: function () {
        let min = this.dataMin;
        let max = this.dataMax;

        return [min, max, max * 1.000001]
      },
      gridLineWidth: 0
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    rangeSelector: {
      labelStyle: {
        color: 'transparent'
      },
      verticalAlign: 'bottom',
      inputEnabled: false,
      buttonSpacing: 5,
      dropdown: 'never',
      buttonTheme: {
        width: 40,
        height: 30,
        fill: 'transparent',
        stroke: 'none',
        r: 10,
        style: {
          color: 'white',
        },
        states: {
          hover: {
            fill: '#222B3D',
            style: {
              fontWeight: 'normal',
              color: 'white'
            }
          },
          select: {
            fill: '#222B3D',
            style: {
              fontWeight: 'normal',
              color: 'white'
            }
          }
        }
      },
      buttonPosition: {
        align: 'center'
      },
      buttons: [
        {
          type: 'minute',
          count: 15,
          text: '15m',
        },
        {
          type: 'minute',
          count: 30,
          text: '30m',
        },
        {
          type: 'hour',
          count: 1,
          text: '1h',
        },
        {
          type: 'hour',
          count: 3,
          text: '3h',
        },
        {
          type: 'hour',
          count: 6,
          text: '6h',
        },
        {
          type: 'hour',
          count: 12,
          text: '12h',
        },
        {
          type: 'all',
          text: '24h',
        },
      ],
      selected: 4
    },
    series: [
      {
        type: 'area',
        name: props.coinName,
        data: props.data,
        color: '#45AEF5',
        fillColor: {
          linearGradient: [0, 0, 0, 180],
          stops: [
            [0, Highcharts.color('#45AEF5').setOpacity(0.5).get('rgba')],
            [1, Highcharts.color('#151c29').setOpacity(0).get('rgba')]
          ]
        },
        lineWidth: 1.5,
        states: {
          hover: {
            lineWidthPlus: 0
          }
        }
      },
    ],
    credits: {
      enabled: false
    }
  };

  const memorizedChart = useMemo(() => {
    return <HighchartsReact
      constructorType={'stockChart'}
      options={chartOptions}
      highcharts={Highcharts}
    />
  }, [props.data]);

  return (
    <>
      <Tooltip data={tooltipData}/>
      {props.data.length> 0 && (
        memorizedChart
      )}
    </>
  );
};

export default CryptoChart;
