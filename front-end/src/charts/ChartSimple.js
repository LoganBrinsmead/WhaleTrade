import React, { Component } from 'react';
import Chart from 'react-apexcharts';
const Data = require('./DemoData.json');

class ChartSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [
            {
              name: 'Candle',
              type: 'candlestick',
              data: this.getDataCandlestick()
            }
        ],
          options: {
            chart: {
              height: 350,
              toolbar: {
                show: false
              },
              animations: {
                enabled: true
              },
              sparkline: {
                enabled: false
              },
              //background: '#1c1c1c'
            },
            title: {
              text: this.props.stockSymbol,
              align: 'left'
            },
            grid: {
              show: false
            },
            tooltip: {
              enabled: false,
            },
            xaxis: {
              labels: {
                show: false
              },
              axisTicks: {
                show: false
              }
            },
            yaxis: {
              show: false
            },
            stroke: {
              curve: 'straight'
            },
            theme: {
              mode: 'light'
            }

            /*
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                //stops: [0, 90, 100]
              }
            }
            */
          }
        };
      }

      getDataCandlestick = () => {
        // Get dates
        const dates = Data.map(obj => obj['date']);
        // Get array of prices: open, close, high, low 
        const prices = Data.map(obj => {
          return [
            obj['open'], 
            obj['high'], 
            obj['low'], 
            obj['close']
          ];
        });
        // data array
        let data = [];
        // X coord take precesdence over y.
        for (let i = 0; i < dates.length; i++){
          data.push(this.dataObjectCandlestick(dates[i], prices[i]));
        }

        return data;
      }

      dataObjectCandlestick = (date, prices) => {
        return {
          x: new Date(date),
          y: prices
        }
      }

      render() {
        return (
          <div>
            <Chart 
                options={this.state.options} 
                series={this.state.series} 
                type={this.props.type}
                height={this.props.height}
                //width={this.props.width}
            />
          </div>
        );
    }
}

export default ChartSimple;