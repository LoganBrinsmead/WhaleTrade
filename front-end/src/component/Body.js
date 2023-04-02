import React from "react";
import Box from '@mui/material/Box'
import CandlestickChart from './charts/CandlestickChart';



const BodyStyle = {
  backgroundColor: "white",
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative'
};


export default function Body(){
  return(
    <Box component="span" sx = {BodyStyle}>
      <CandlestickChart/>

    </Box>
  )
}


