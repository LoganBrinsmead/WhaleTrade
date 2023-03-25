import React from 'react';
<<<<<<< HEAD
import Header from './component/Header'


=======
import CandlestickChart from './charts/CandlestickChart';
>>>>>>> 1c72a58879832adbe722a8bee7027b074b88f58f

function App () {
  return (
    <div>
          <Header />
    </div>
  )
}

<<<<<<< HEAD
export default App
=======
// FOR TESTING: visualizing the test chart.
function chart () {
  return (
    <div>
      <h1>Welcome to Whale Trade</h1>
      <div>
        <CandlestickChart
          type="candlestick" 
          height={650}
          stockSymbol="APPL" 
        />
      </div>
    </div>
  )
}

export default chart
>>>>>>> 1c72a58879832adbe722a8bee7027b074b88f58f
