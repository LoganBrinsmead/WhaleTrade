import React from "react";
import Box from '@mui/material/Box'
import CandlestickChart from '../charts/CandlestickChart';
//import Sidebar from "./SideBar";
import SignUp from "./SignUp";

const bodyStyle = {
  backgroundColor: "white",
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative'
};

const chartStyle = {
  width: '80%',
  position: "relative",
  left: '1',
  border: "1px solid white",
 // height: 400
};

const sideBarStyle = {
  width: '20%',
  position: "relative",
};





export default function Body(){
  return(
    
    <Box sx={bodyStyle}>    

    <Box sx = {sideBarStyle}>
         
    </Box>

      
       
    <Box sx={chartStyle}>
        <CandlestickChart
            type="candlestick" 
            height="600"
            width="100%"
            stockSymbol="AAPL" 
            
        />
    </Box>  
      
    
    </Box>
  )
}












