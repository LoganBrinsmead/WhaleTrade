import { useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "./SideBar";
import CandlestickChart from "../charts/CandlestickChart";

const bodyStyle = {
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative",
};

const chartStyle = {
  width: "80%",
  position: "relative",
  left: "1",
  border: "1px solid white",
  // height: 400
};

const sideBarStyle = {
  width: "20%",
  position: "relative",
};

export default function Body() {
  const [selectedItem, setSelectedItem] = useState("AAPL");

  return (
    <Box sx={bodyStyle}>
      <Box sx={sideBarStyle}>
        <Sidebar  
            props ={{
              selectedItem: selectedItem,
              setSelectedItem: setSelectedItem
            }}
        />
      </Box>


      <Box sx = {chartStyle}>
        <CandlestickChart 
          type="candlestick"
          height={650}
          stockSymbol="AAPL"
        />
      </Box>
      
    </Box>
  );
}
