import React from "react";
import Box from '@mui/material/Box'
import CandlestickChart from '../charts/CandlestickChart';
import Sidebar from "./SideBar";

const bodyStyle = {
  backgroundColor: "#defafa",
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative'
};

const chartStyle = {
  width: '80%',
  position: "absolute",
  left: '20%',
  border: "1px solid black"
};

const sideBarStyle = {
  width: '20%',
  position: "absolute",
};






export default function Body(){
  return(
    <Box sx={bodyStyle}>
      <Box sx={chartStyle}>
        <CandlestickChart
          type="candlestick" 
          height={400}
          width="100%"
          stockSymbol="AAPL" 
        />
      </Box>  
      
     
    </Box>
  )
}












