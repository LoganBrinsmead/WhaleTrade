import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import Box from '@mui/material/Box'
import { getIntraDayData, getWeeklyData, getMonthlyData } from '../services/api/whaletradApi'; 

class CandlestickChart extends Component {
    constructor(props) {
        super(props);
        // *Will be called twice due to React.
        this.chartData = this.getDataFromAPI(this.props.stockSymbol, "1min", "intraDay");

        this.currentTimeline = 'one_day';

        this.state = {
          series: [
            {
            name: 'candle',
            type: 'candlestick',
            data: this.getDataCandlestick(this.chartData) 
          },
          /*
          {
            name: 'line',
            type: 'line',
            data: [
              {
                x: new Date(1538778600000),
                y: 6604
              }, {
                x: new Date(1538782200000),
                y: 6602
              }, {
                x: new Date(1538814600000),
                y: 6607
              }, {
                x: new Date(1538884800000),
                y: 6620
              }
            ]
          }
          */
        ],
          options: {
            chart: {
              height: 350,
            },
            title: {
              text: 'Stock Chart Test',
              align: 'left'
            },
            annotations: {
              xaxis: [
                {
                  x: 'Oct 06 14:00',
                  borderColor: '#00E396',
                  label: {
                    borderColor: '#00E396',
                    style: {
                      fontSize: '12px',
                      color: '#fff',
                      background: '#00E396'
                    },
                    orientation: 'horizontal',
                    offsetY: 7,
                    text: 'Annotation Test'
                  }
                }
              ]
            },
            legend: {
              show: false
            },
            grid: {
              show: false
            },      
            tooltip: {
              enabled: true,
              fixed: {
                enabled: true,
                position: 'topLeft',
                offsetY: 55
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              axisTicks: {
                show: false
              },              
              type: 'category',
              labels: {
                show: false,
                formatter: function(val) {
                  return dayjs(val).format('MMM DD HH:mm');
                }
              }
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true
              }
            },
            stroke: {
              curve: 'straight'
            },
            theme: {
              mode: 'light'
            }
          }
        };
      }
      
      /************************************************************************ */
      /**finnhub.io API */
      /************************************************************************ */
      
      getDataFromAPI = (symbol, resolution, timeInterval) => {
        console.log('In getDataFromAPI: ', symbol, resolution, timeInterval);        
        
        // Placeholder for API.
        // Fetched data goes here.
        const dataFromAPI = {
          "c": [
            217.68,
            221.03,
            219.89
          ],
          "h": [
            222.49,
            221.5,
            220.94
          ],
          "l": [
            217.19,
            217.1402,
            218.83
          ],
          "o": [
            221.03,
            218.55,
            220
          ],
          "s": "ok",
          "t": [
            1569297600,
            1569384000,
            1569470400
          ],
          "v": [
            33463820,
            24018876,
            20730608
          ]
        };
        
        if (timeInterval == "intraDay"){
          
          getIntraDayData(symbol, resolution, "compact")
          .then( res => {
            console.log(res.data);
            //return parseData(res.data, `Time Series (${resolution})`);
          })
          .catch( error => {
            console.log(error);
          })
        } else if (timeInterval == "weekly"){
          
          getWeeklyData(symbol)
          .then( res => {
            console.log(res.data);
            //return parseData(res.data, "Weekly Time Series");
          })
          .catch( error => {
            console.log(error);
          })
        } else if (timeInterval == "monthly"){
          
          getMonthlyData(symbol)
          .then( res => {
            console.log(res.data);
            //parseData(res.data, "Monthly Time Series");
          })
          .catch( error => {
            console.log(error);
          })
        }
        
        let parsedData = [];
        for (var i = 0; i < dataFromAPI['t'].length; i++){
          // Convert UNIX timestamp from sec to milisec precision for Apexcharts.
          parsedData.push(
            {
              "date": dataFromAPI['t'][i] * 1000,
              "open": dataFromAPI['o'][i],
              "high": dataFromAPI['h'][i],
              "low": dataFromAPI['l'][i],
              "close": dataFromAPI['c'][i],
              "volume": dataFromAPI['v'][i]
            }
          );
        }
        
        //console.log(parsedData);
        
        return parsedData;
      }

      // Time Series (<resolution>)
      // Weekly Time Series
      // Monthly Time Series
      parseData = (responseData, timeSeries) => {
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
                
      /************************************************************************ */
      /**Candlestick, Line, Area Charts */
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

      displayLineChart = (chartData) => {
        console.log('Displaying line chart');
        this.setState({
          series: [
            {
              name: 'Close',
              type: 'line',
              data: this.getData(chartData)
            } 
          ]
        })
      }

      displayAreaChart = (chartData) => {
        console.log('Displaying area chart');
        this.setState({
          series: [
            {
              name: 'Close',
              type: 'area',
              data: this.getData(chartData) 
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

      getData = (chartData) => {
        // Get date.
        const dates = chartData.map(obj => obj['date']);
        // Get closing prices.
        const prices = chartData.map(obj => obj['close'])
        // Data array.
        let data = [];
        // Number dates match number of prices.
        for (let i = 0; i < dates.length; i++){
          data.push(this.dataObject(dates[i], prices[i]));
        }

        return data;
      }

      dataObject = (date, price) => {
        return {
          x: new Date(date),
          y: price
        }
      }
            
      /************************************************************************ */
      /**Change time interval */
      /************************************************************************ */
      
      updateData = (timeline, resolution) => {
        this.currentTimeline = timeline;
        let newData;
        
        switch(timeline){
          case 'intraDay':
            console.log('switch intraday');
            
            newData = this.getDataFromAPI(
              this.props.symbol, 
              resolution === undefined ? "1min" : resolution, 
              timeline
            );
            this.setStateForUpdate(newData);
            break
          case 'weekly':
            console.log('switch weekly');
            
            newData = this.getDataFromAPI(this.props.symbol, undefined, timeline);
            this.setStateForUpdate(newData);
            break
          case 'monthly':
            console.log('switch monthly');
            
            newData = this.getDataFromAPI(this.props.symbol, undefined, timeline);
            this.setStateForUpdate(newData);
            break
          default:
        }
      }

      setStateForUpdate = (endDate_mili, resolution) => {
        this.setState({
          series: [
            {
              name: this.state.series[0]['name'],
              type: this.state.series[0]['type'],
              data: this.getDataStartingFrom(endDate_mili, resolution)
            }
          ]
        })
      }

      getDataStartingFrom = (endDate_mili, resolution) => {
        // Convert UNIX timestamp from milisec to second precision for finnhub.
        const endDate_sec = endDate_mili / 1000;
        const parsedData = this.getDataFromAPI(
          this.props.stockSymbol, 
          resolution
        );
        // Get date.
        const objectsInInterval = parsedData.filter(obj => obj['date'] >= endDate_mili);
        // Get array of objects containing x: date, y: price(s).
        let data;
        if (this.state.series[0]['type'] === 'candlestick'){
          console.log('is candlestick');
          data = objectsInInterval.map(obj => this.dataObject(
            obj['date'], 
            [
              obj['open'], 
              obj['high'], 
              obj['low'], 
              obj['close']
            ]
          ));
        } else {
          console.log('not candlestick');
          data = objectsInInterval.map(obj => this.dataObject(obj['date'], obj['close']));
        }
        return data;
      }
      /*
      componentDidMount = () => {
        fetch('http://localhost:9000/api/v1/market/stocks/candlestick', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            "symbol": "AAPL",
            "resolution": "D",
            "from": "1679103229",
            "to": "1677724429"
          })
        })
        .then(res => console.log(res))
        .then(data => {
          console.log("success: ", data)
          this.parsedDataFromAPI(data)
        })
        .catch(error => console.log(error));     
      }

      parsedDataFromAPI = (data) => {
        
      }
      */
      render() {
        return (
          <Box>
            <button onClick={()=>this.updateData('intraday')}>1D</button>
            <button onClick={()=>this.updateData('weekly')}>Weekly</button>
            <button onClick={()=>this.updateData('monthly')}>Monthly</button>
            <button onClick={()=>this.updateData('all')}>All</button>
            <button></button>
            <button onClick={()=>this.updateData(this.currentTimeline, "1")}>1 min</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "5")}>5 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "15")}>15 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "30")}>30 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "60")}>1 hour</button>
            <Chart 
                options={this.state.options} 
                series={this.state.series} 
                type={this.props.type}
                height={this.props.height}
            />
            <button onClick={()=>this.displayCandlestickChart(this.chartData)}>Candlestick</button>
            <button onClick={()=>this.displayLineChart(this.chartData)}>Line</button>
            <button onClick={()=>this.displayAreaChart(this.chartData)}>Area</button>
          </Box>
        );
    }
}

export default CandlestickChart;