import React from 'react';
import Header from './component/Header'
//import CandlestickChart from './charts/CandlestickChart';

function App () {
  return (
    <div>
        <Header />        
    </div>
  )
}


// FOR TESTING: visualizing the test chart.
// function chart () {
//   return (
//     <div>
//       <h1>Welcome to Whale Trade</h1>
//       <div>
//         <CandlestickChart
//           type="candlestick"
//           height={650}
//           stockSymbol="appl"
//         />
//       </div>
//     </div>
//   )
// }

export default App