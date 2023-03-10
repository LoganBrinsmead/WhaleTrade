import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
const Data = require('./DemoData.json');

class CandlestickChart extends Component {
    constructor(props) {
        super(props);
        // Get data for current day with 1 min resolution.
        const currentDate_mili = new Date(Date.now())
        const [
          hourUnix_mili, 
          minutesUnix_mili, 
          secUnix_mili
        ] = [
          currentDate_mili.getHours() * 3600 * 1000,
          currentDate_mili.getMinutes() * 60 *1000,
          currentDate_mili.getSeconds() * 1000
        ]
        const partialDayUnix_mili = hourUnix_mili + minutesUnix_mili + secUnix_mili;
        const endDate_mili = currentDate_mili - partialDayUnix_mili;
        // *Will be called twice due to React.
        this.chartData = this.getDataFromAPI(this.props.stockSymbol, "1", Date.now(), endDate_mili);

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
            tooltip: {
              enabled: true,
            },
            xaxis: {
              type: 'category',
              labels: {
                formatter: function(val) {
                  return dayjs(val).format('MMM DD HH:mm');
                }
              }
            },
            yaxis: {
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
      
      getDataFromAPI = (symbol, resolution, from, to) => {
        console.log('In getDataFromAPI: ', symbol, resolution, from, to);        
        /*
        fetch('http://localhost:5000/api/v1/market/stocks/list/exchanges')
          .then(res => res.json())
          .then(data => console.log(data));
        */
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
        //console.log(resolution === undefined ? "*undefined" : "*defined");
        //console.log(timeline);
        // Save current timeline
        this.currentTimeline = timeline;

        // UNIX timestamp in miliseconds
        const currentDate_mili = new Date(Date.now());
        // Doesn't account for leap year.
        const [year, month, day] = [
          currentDate_mili.getFullYear(),          
          currentDate_mili.getMonth(),
          currentDate_mili.getDate()
        ];
        const [
          hourUnix_mili, 
          minutesUnix_mili, 
          secUnix_mili
        ] = [
          currentDate_mili.getHours() * 3600 * 1000,
          currentDate_mili.getMinutes() * 60 *1000,
          currentDate_mili.getSeconds() * 1000
        ]
        let endDate_mili = 0;
        const partialDayUnix_mili = hourUnix_mili + minutesUnix_mili + secUnix_mili;
        
        switch(timeline){
          case 'one_day':
            console.log('switch one day');
            endDate_mili = currentDate_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "1" : resolution);
            break
          case 'five_days':
            console.log('switch five days');
            const fourFullDaysUnix_mili = 4 * 86400 * 1000;
            endDate_mili = currentDate_mili - fourFullDaysUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "5" : resolution);
            break
          case 'one_month':
            // 1 Month (30.44 days) is 2629743 Seconds.
            console.log('switch one month');
            // 1 Month minus one day to factor in the current partial day.
            const oneMonthOffsetedUnix_mili = 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - oneMonthOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "D" : resolution);
            break
          case 'three_months':
            console.log('switch three months');
            const threeMonthsOffsetedUnix_mili = 3 * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - threeMonthsOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "D" : resolution);
            break
          case 'six_months':
            console.log('switch six months');
            const sixMonthsOffsetedUnix_mili = 6 * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - sixMonthsOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "D" : resolution);
            break
          case 'YTD':
            console.log('switch year-to-day');
            const YTDOffsetedUnix_mili = month * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - YTDOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "D" : resolution);
            break
          case 'one_year':
            console.log('switch one year');
            const yearOffsetedUnix_mili = 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - yearOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "D" : resolution);
            break
          case 'two_years':
            console.log('switch two years');
            const twoYearsOffsetedUnix_mili = 2 * 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - twoYearsOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "W" : resolution);
            break
          case 'five_years':
            console.log('switch five years');
            const fiveYearsOffsetedUnix_mili = 5 * 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - fiveYearsOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "W" : resolution);
            break
          case 'all':
            console.log('switch all');
            // beginnign of UNIX epoch: Januray 1, 1970.
            endDate_mili = 0;
            console.log(endDate_mili);
            this.setStateForUpdate(endDate_mili, resolution === undefined ? "W" : resolution);
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
          resolution, 
          Date.now(), 
          endDate_sec
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

      render() {
        return (
          <div>
            <button onClick={()=>this.updateData('one_day')}>1D</button>
            <button onClick={()=>this.updateData('five_days')}>5D</button>
            <button onClick={()=>this.updateData('one_month')}>1M</button>
            <button onClick={()=>this.updateData('three_months')}>3M</button>
            <button onClick={()=>this.updateData('six_months')}>6M</button>
            <button onClick={()=>this.updateData('YTD')}>YTD</button>
            <button onClick={()=>this.updateData('one_year')}>1Y</button>
            <button onClick={()=>this.updateData('two_years')}>2Y</button>
            <button onClick={()=>this.updateData('five_years')}>5Y</button>
            <button onClick={()=>this.updateData('all')}>All</button>
            <button></button>
            <button onClick={()=>this.updateData(this.currentTimeline, "1")}>1 min</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "5")}>5 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "15")}>15 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "30")}>30 mins</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "60")}>1 hour</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "D")}>1 day</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "W")}>1 week</button>
            <button onClick={()=>this.updateData(this.currentTimeline, "M")}>1 month</button>
            <Chart 
                options={this.state.options} 
                series={this.state.series} 
                type={this.props.type}
                height={this.props.height}
            />
            <button onClick={()=>this.displayCandlestickChart(this.chartData)}>Candlestick</button>
            <button onClick={()=>this.displayLineChart(this.chartData)}>Line</button>
            <button onClick={()=>this.displayAreaChart(this.chartData)}>Area</button>
          </div>
        );
    }
}

export default CandlestickChart;