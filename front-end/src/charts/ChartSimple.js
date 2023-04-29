import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { getIntraDayData } from '../services/api/whaletradApi'; 

class ChartSimple extends Component {
    constructor(props) {
        super(props);
        // *Will be called twice due to React.
        this.getDataFromAPI(
          this.props.stockSymbol, 
          "60min", 
          "intraDay", 
          this.displayCandlestickChart
        );
        this.chartData = [];
        this.state = {
          series: [
            {
              name: 'Candle',
              type: 'candlestick',
              data: []
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


      /************************************************************************ */
      /**Get Data From API */
      /************************************************************************ */
      
      getDataFromAPI = (symbol, resolution, timeInterval, chartFunc) => {
        console.log('In getDataFromAPI: ', symbol, resolution, timeInterval, chartFunc);        
        
        const parseData = (responseData, timeSeries) => {
          let parsedData = [];
          const timeSeriesData = responseData[timeSeries];
          
          for (const time in timeSeriesData){
            const date = new Date(time);

            parsedData.push({
              "date": date.getTime(),
              "open": timeSeriesData[time]["1. open"],
              "high": timeSeriesData[time]["2. high"],
              "low": timeSeriesData[time]["3. low"],
              "close": timeSeriesData[time]["4. close"],
              "volume": timeSeriesData[time]["5. volume"]
            });
          }

          return parsedData;
        }

        const foo = () => {
          getIntraDayData(symbol, resolution, "compact")
          .then( res => {
            console.log(res.data);
            this.chartData = parseData(res.data, `Time Series (${resolution})`);
            console.log(this.chartData);
            chartFunc(this.chartData);
          })
          .catch( error => {
            console.log(error);
          })
        }

        foo();
      }
 
      /************************************************************************ */
      /**Candlestick*/
      /************************************************************************ */
        
      displayCandlestickChart = (chartData) => {
        console.log('displaying candlestick chart');
        this.setState({
          series: [
            {
              name: 'Candle',
              type: 'candlestick',
              data: this.getDataCandlestick(chartData)
            }
          ]
        })
      }
      
      getDataCandlestick = (chartData) => {
        // Get dates
        const dates = chartData.map(obj => obj['date']);
        // Get array of prices: open, close, high, low 
        const prices = chartData.map(obj => {
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
          data.push(this.dataObject(dates[i], prices[i]));
        }

        return data;
      }

      dataObject = (date, prices) => {
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