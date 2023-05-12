import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

function Sidebar({ props }) {
    
  const { selectedItem, setSelectedItem } = props;

  const stockNames = [
    'AAPL',
    'GOOGL',
    'AMZN',
    'MSFT',
    'FB',
    'TSLA',
    'NFLX',
    'NVDA',
    'AMD',
    'INTC'
  ];




  const handleListItemClick = (stockName) => {
    console.log(stockName);
    setSelectedItem(stockName);
  };

  return (
    <Box variant="permanent" anchor="left" width={200}>
      <List>
        {stockNames.map((stockName, index) => (
          <ListItem
            key={stockName}
            button
            selected={selectedItem === index}
            onClick={() => handleListItemClick(stockName)}
            sx={{
              border: '1px solid black',
              paddingLeft: '40px',
              '&:hover': {
                backgroundColor: '#e1f5fe', // light blue color
              },
            }}
          >
            <ListItemText primary={stockName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
