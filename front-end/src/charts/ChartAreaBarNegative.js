import React, { Component } from 'react';
import Chart from 'react-apexcharts';
const Data = require('./DemoData.json');

class ChartAreaBarNegative extends Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [
            {
              name: 'Area',
              type: 'bar',
              data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
                5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
                48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
              ]
            }
        ],
          options: {
            chart: {
              height: 350,
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              },
              sparkline: {
                enabled: false
              }
            },
            plotOptions: {
              bar: {
                colors: {
                  ranges: [
                    {
                      from: 0,
                      to: 100,
                      color: '#0fab0f'
                    },
                    {
                      from: -100,
                      to: 0,
                      color: '#FF0000'
                    }
                  ]
                }
              }
            },
            title: {
              text: this.props.stockSymbol,
              align: 'left'
            },
            legend: {
              show: false
            },
            grid: {
              show: false
            },
            tooltip: {
              enabled: false,
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              labels: {
                show: false
              },
              axisTicks: {
                show: false,
                borderType: 'solid',
                color: '#000000',
                height: 20
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
            },
            fill: {
              opacity: 0.5
            }
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

export default ChartAreaBarNegative;