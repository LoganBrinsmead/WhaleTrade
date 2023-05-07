import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from './component/Header';
import Summary from './component/StockSummary';
import CandlestickChart from './charts/CandlestickChart';
import Login from './component/Login';
import Body from './component/Body';
import SignUp from './component/SignUp';
import { useEffect, useState, useContext } from 'react';
import { getStockQuote } from './services/api/whaletradApi';
import { GlobalContext, GlobalProvider } from './context/GlobalContext';

function Home() {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

function SummaryPage() {

  const { symbol } = useParams();
  const [ summaryData, setSummaryData ] = useState({});
    
  useEffect(() => {
    getStockQuote(symbol)
      .then( res => {
        setSummaryData({
          ticker: symbol,
          currentPrice: res.data.c, 
          openPrice: res.data.o,
        })
      }).catch( err => {
        console.log(err);
      });
  }, [symbol])

  return (
    <>
      <Header />
      <Summary props={summaryData}/>
    </>
  );
}

function ChartPage() {
  const { symbol } = useParams();

  return (
    <>
      <Header />
      <CandlestickChart
        type="candlestick"
        height={650}
        stockSymbol={symbol}
      />
    </>
  )
}

function App() {

  // const { isAuth } = useContext(GlobalContext);



  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/summary/:symbol' element={<SummaryPage />} />
        <Route path='/chart/:symbol' element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
