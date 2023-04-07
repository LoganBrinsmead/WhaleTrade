import React from 'react';
<<<<<<< HEAD
import Header from './component/Header'
import Body from './component/Body'

=======
// import Header from './component/Header'
import CandlestickChart from './charts/CandlestickChart';
import SearchBar from "./component/SearchBar";
>>>>>>> d421a33cefe770213f8b32ab45fdcf68f46e8c3a

function App () {
  return (
    <div>
<<<<<<< HEAD
          <Header />
          <Body/>
{/*
          <div>
=======
          {/*<Header />*/}
        <SearchBar/>
    </div>
  )
}


// FOR TESTING: visualizing the test chart.
function chart () {
  return (
    <div>
      <h1>Welcome to Whale Trade</h1>
      <div>
>>>>>>> d421a33cefe770213f8b32ab45fdcf68f46e8c3a
        <CandlestickChart
          type="candlestick" 
          height={650}
          stockSymbol="appl" 
        />
      </div>

*/}
    </div>
  )
}

<<<<<<< HEAD

export default App



=======
export default App
>>>>>>> d421a33cefe770213f8b32ab45fdcf68f46e8c3a
