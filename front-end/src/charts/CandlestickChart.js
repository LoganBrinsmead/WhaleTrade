import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
const Data = require('./DemoData.json');

class CandlestickChart extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.stockSymbol);
        // get data from api for specific symbol.
        // parse data to readable format for apexcharts.

        this.state = {
          series: [
            {
            name: 'candle',
            type: 'candlestick',
            data: this.getDataCandlestick() 
          },
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
            
      displayCandlestickChart = () => {
        console.log('displaying candlestick chart');
        this.setState({
          series: [
            this.createCandlestickObject()
          ]
        })
      }

      displayLineChart = () => {
        console.log('Displaying line chart');
        this.setState({
          series: [
            this.createLineObject() 
          ]
        })
      }

      displayAreaChart = () => {
        console.log('Displaying area chart');
        this.setState({
          series: [
            this.createAreaObject() 
          ]
        })
      }
      
      createCandlestickObject = () => {
        return {
          name: 'Candle',
          type: 'candlestick',
          data: this.getDataCandlestick()
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

      createLineObject = () => {
        return {
          name: 'Close',
          type: 'line',
          data: this.getData()
        }
      }

      createAreaObject = () => {
        return {
          name: 'Close',
          type: 'area',
          data: this.getData() 
        };
      }

      getData = () => {
        // Get date.
        const dates = Data.map(obj => obj['date']);
        // Get closing prices.
        const prices = Data.map(obj => obj['close'])
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

      updateData = (timeline) => {
        // Get recent date.
        // Subtract specific time from date to get end date.
        // Get data between recent and end.

        // UNIX timestamp in miliseconds
        // *Remove value in new Date() after implementing api.
        const currentDate_mili = new Date(1538884800000);
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

            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'five_days':
            console.log('switch five days');
            const fourFullDaysUnix_mili = 4 * 86400 * 1000;
            endDate_mili = currentDate_mili - fourFullDaysUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            }) 
            break
          case 'one_month':
            // 1 Month (30.44 days) is 2629743 Seconds.
            console.log('switch one month');
            // 1 Month minus one day to factor in the current partial day.
            const oneMonthOffsetedUnix_mili = 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - oneMonthOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'three_months':
            console.log('switch three months');
            const threeMonthsOffsetedUnix_mili = 3 * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - threeMonthsOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'six_months':
            console.log('switch six months');
            const sixMonthsOffsetedUnix_mili = 6 * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - sixMonthsOffsetedUnix_mili - partialDayUnix_mili; 
            console.log(endDate_mili);
            
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'YTD':
            console.log('switch year-to-day');
            const YTDOffsetedUnix_mili = month * 2629743 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - YTDOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);

            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'one_year':
            console.log('switch one year');
            const yearOffsetedUnix_mili = 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - yearOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'two_years':
            console.log('switch two years');
            const twoYearsOffsetedUnix_mili = 2 * 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - twoYearsOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'five_years':
            console.log('switch five years');
            const fiveYearsOffsetedUnix_mili = 5 * 31556926 * 1000 - 86400 * 1000;
            endDate_mili = currentDate_mili - fiveYearsOffsetedUnix_mili - partialDayUnix_mili;
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
          case 'all':
            console.log('switch all');
            // beginnign of UNIX epoch: Januray 1, 1970.
            endDate_mili = 0;
            console.log(endDate_mili);
                        
            this.setState({
              series: [
                {
                  name: this.state.series[0]['name'],
                  type: this.state.series[0]['type'],
                  data: this.getDataStartingFrom(endDate_mili)
                }
              ]
            })
            break
            default:
        }
      }

      getDataStartingFrom = (endDate) => {
        // Get date.
        const objectsInInterval = Data.filter(obj => obj['date'] >= endDate);
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
        //console.log(data);
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
            <Chart 
                options={this.state.options} 
                series={this.state.series} 
                type={this.props.type}
                height={this.props.height}
            />
            <button onClick={this.displayCandlestickChart}>Candlestick</button>
            <button onClick={this.displayLineChart}>Line</button>
            <button onClick={this.displayAreaChart}>Area</button>
          </div>
        );
    }
}

export default CandlestickChart;