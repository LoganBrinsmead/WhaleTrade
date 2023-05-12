import React from "react";
import Box from "@mui/material/Box";

import Trending from "./Trending";
import Header from "./Header";

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

export default function TrendingPage() {
  return (
    <Box>
    <Header />
    <Box sx={bodyStyle}>
      <Box sx={sideBarStyle}>
      </Box>

      <Box>
        <Trending symbolList={["AAPL", "GOOG", "MSFT", "AMZN"]} />
      </Box>
    </Box>
    </Box>
  );
}
