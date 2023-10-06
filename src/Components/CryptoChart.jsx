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
  const [currentRangeData, setCurrentRangeData] = useState([])

  const initCurrentRangeData = (chart) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    setCurrentRangeData(props.data.filter(data => data[0] >= min && data[0] <= max))
  };

  useEffect(() => {
    setDefaultTooltipData(props.coinName, props.data, setTooltipData)
  }, [props.data, props.coinName]);

  const chartOptions = {
    chart: {
      type: 'line',
      zoomType: 'x',
      backgroundColor: '#10161f',
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
        style: {
          color: '#2e3847'
        },
        format: '{value:%H:%M}',
      },
      crosshair: {
        width: 0.6,
        color: '#5bb8f6'
      },
      events: {
        setExtremes: function(e) {
          const min = e.min;
          const max = e.max;
          setCurrentRangeData(props.data.filter(data => data[0] >= min && data[0] <= max))
        }
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
          fillColor: '#5bb8f6',
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
          color: '#8994a3'
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
          fontWeight: 'bold'
        },
        states: {
          hover: {
            fill: '#222B3D',
            style: {
              fontWeight: 'bold',
              color: 'white',
            }
          },
          select: {
            fill: '#222B3D',
            style: {
              fontWeight: 'bold',
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
      selected: 6
    },
    series: [
      {
        type: 'area',
        name: props.coinName,
        data: props.data,
        color: '#5bb8f6',
        fillColor: {
          linearGradient: [0, 0, 0, 180],
          stops: [
            [0, Highcharts.color('#5bb8f6').setOpacity(0.5).get('rgba')],
            [1, Highcharts.color('#10161f').setOpacity(0).get('rgba')]
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
      callback={chart => {
        initCurrentRangeData(chart);
      }}
    />
  }, [props.data]);

  return (
    <>
      <Tooltip currentRangeData={currentRangeData} data={tooltipData}/>
      {props.data.length> 0 && (
        memorizedChart
      )}
    </>
  );
};

export default CryptoChart;
