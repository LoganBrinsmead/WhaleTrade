import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import Box from '@mui/material/Box'
import { getIntraDayData, getWeeklyData, getMonthlyData } from '../services/api/whaletradApi'; 

class CandlestickChart extends Component {
    constructor(props) {
        super(props);
        // *Will be called twice due to React.
        this.getDataFromAPI(
          this.props.stockSymbol, 
          "1min", 
          "intraDay", 
          this.displayCandlestickChart
        );
        this.currentTimeline = 'intraday';
        this.chartData = [];
        this.state = {
          series: [
            {
            name: 'candle',
            type: 'candlestick',
            data: [] 
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
            /*
            fill: {
              colors: ['#F44336', '#E91E63', '#9C27B0'],
              gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ['#F44336', '#E91E63', '#9C27B0'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
              }
            },
            */
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
              show: true,
              curve: 'straight',
              color: ['#07D600']
            },
            theme: {
              mode: 'light'
            }
          }
        };
      }
      
      componentDidMount = () => {
        console.log("component did mount");
      }

      /************************************************************************ */
      /**Get Data From API */
      /************************************************************************ */
      
      getDataFromAPI = (symbol, resolution, timeInterval, chartFunc) => {
        console.log('In getDataFromAPI: ', symbol, resolution, timeInterval, chartFunc);        
        
        // Time Series (<resolution>)
        // Weekly Time Series
        // Monthly Time Series
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
          if (timeInterval === "intraDay"){
            
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
          } else if (timeInterval === "weekly"){
            
            getWeeklyData(symbol)
            .then( res => {
              console.log(res.data);
              this.chartData = parseData(res.data, "Weekly Time Series");
              console.log(this.chartData);
              chartFunc(this.chartData);
            })
            .catch( error => {
              console.log(error);
            })
          } else if (timeInterval === "monthly"){
            
            getMonthlyData(symbol)
            .then( res => {
              console.log(res.data);
              this.chartData = parseData(res.data, "Monthly Time Series");
              console.log(this.chartData);
              chartFunc(this.chartData);
            })
            .catch( error => {
              console.log(error);
            })
          }
        }

        foo();
        //const foo2 = async () => { await foo(); }
        //foo2();
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
        console.log("updating data");
        this.currentTimeline = timeline;
        
        let chartFunc;
        switch(this.state.series[0]['type']){
          case 'candlestick':
            console.log('candlestick');
            chartFunc = this.displayCandlestickChart;
            break
          case 'line':
            console.log('line');
            chartFunc = this.displayLineChart;
            break
          case 'area':
            console.log('area');
            chartFunc = this.displayAreaChart;
            break
          default:
        }

        switch(timeline){
          case 'intraDay':
            console.log('switch intraday');
            this.getDataFromAPI(
              this.props.stockSymbol, 
              resolution === undefined ? "1min" : resolution, 
              timeline,
              chartFunc
            );
            break
          case 'weekly':
            console.log('switch weekly');
            this.getDataFromAPI(this.props.stockSymbol, undefined, timeline, chartFunc);
            break
          case 'monthly':
            console.log('switch monthly');            
            this.getDataFromAPI(this.props.stockSymbol, undefined, timeline, chartFunc);
            break
          default:
        }
      }

      render() {
        return (
          <Box>
            <button onClick={()=>this.updateData('intraDay')}>1D</button>
            <button onClick={()=>this.updateData('weekly')}>Weekly</button>
            <button onClick={()=>this.updateData('monthly')}>Monthly</button>
            <button onClick={()=>this.updateData('all')}>All</button>
            <button></button>
            <button onClick={()=>this.updateData('intraDay', "1min")}>1 min</button>
            <button onClick={()=>this.updateData('intraDay', "5min")}>5 mins</button>
            <button onClick={()=>this.updateData('intraDay', "15min")}>15 mins</button>
            <button onClick={()=>this.updateData('intraDay', "30min")}>30 mins</button>
            <button onClick={()=>this.updateData('intraDay', "60min")}>1 hour</button>
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