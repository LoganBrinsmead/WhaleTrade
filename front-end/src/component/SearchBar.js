import { useState, useEffect } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchDate] = useState({});



  const handleSubmit = (event) => {
    
    event.preventDefault();
    // setSearchQuery(searchText);
    fetch(`http://localhot:9000/api/v1/market/stocks/search?=${searchText}`)
    .then( res => res.json )
    .then ( data => {
      console.log(data)
    })
     
    
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item sx={{ width: "500px" }}>
            <TextField
              id="search-bar"
              label="Search"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SearchBar;
