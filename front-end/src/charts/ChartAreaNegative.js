import React, { Component } from 'react';
import Chart from 'react-apexcharts';
const Data = require('./DemoData.json');

class ChartAreaNegative extends Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [
            {
              name: 'Area',
              type: 'area',
              data: [
                {
                  x: 1996,
                  y: 162
                },
                {
                  x: 1997,
                  y: 90
                },
                {
                  x: 1998,
                  y: 50
                },
                {
                  x: 1999,
                  y: 77
                },
                {
                  x: 2000,
                  y: 35
                },
                {
                  x: 2001,
                  y: -45
                },
                {
                  x: 2002,
                  y: -88
                },
                {
                  x: 2003,
                  y: -120
                },
                {
                  x: 2004,
                  y: -156
                },
                {
                  x: 2005,
                  y: -123
                },
                {
                  x: 2006,
                  y: -88
                },
                {
                  x: 2007,
                  y: -66
                },
                {
                  x: 2008,
                  y: -45
                },
                {
                  x: 2009,
                  y: -29
                },
                {
                  x: 2010,
                  y: -45
                },
                {
                  x: 2011,
                  y: -88
                },
                {
                  x: 2012,
                  y: -132
                },
                {
                  x: 2013,
                  y: -146
                },
                {
                  x: 2014,
                  y: -169
                },
                {
                  x: 2015,
                  y: -184
                }
              ]
            },
            {
              name: 'Area2',
              type: 'area',
              data: [
                {
                  x: 1996,
                  y: null
                },
                {
                  x: 1997,
                  y: null
                },
                {
                  x: 1998,
                  y: null
                },
                {
                  x: 1999,
                  y: null
                },
                {
                  x: 2000,
                  y: null
                },
                {
                  x: 2001,
                  y: -45
                },
                {
                  x: 2002,
                  y: -88
                },
                {
                  x: 2003,
                  y: -120
                },
                {
                  x: 2004,
                  y: -156
                },
                {
                  x: 2005,
                  y: -123
                },
                {
                  x: 2006,
                  y: -88
                },
                {
                  x: 2007,
                  y: -66
                },
                {
                  x: 2008,
                  y: -45
                },
                {
                  x: 2009,
                  y: -29
                },
                {
                  x: 2010,
                  y: -45
                },
                {
                  x: 2011,
                  y: -88
                },
                {
                  x: 2012,
                  y: -132
                },
                {
                  x: 2013,
                  y: -146
                },
                {
                  x: 2014,
                  y: -169
                },
                {
                  x: 2015,
                  y: -184
                }
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

export default ChartAreaNegative;