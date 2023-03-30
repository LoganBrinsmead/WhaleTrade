import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Summary (props) {
    const {ticker, currentPrice, openPrice} = props
    let priceChange = (100 * (openPrice - currentPrice) / openPrice).toFixed(2);
    let textColor = "red";
    if (priceChange > 0)
      textColor = "green";
    if (priceChange < 0)

    return (
      <Box
      sx={{
        width: 100,
        height: 60,
        backgroundColor: 'white',
        border: '1px dashed grey',
      }}
      >
        {ticker} <br/>
        {currentPrice.toFixed(2)} <br/>
        <Typography color = {textColor}>
          {priceChange}
        </Typography>
      </Box>
    )
  }