import { useState, useEffect } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material"


const SearchBar = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState({});


  const handleQuery = () => {
    fetch(`http://localhost:9000/api/v1/market/stocks/search?=${searchText}`)
      .then( res => res.json())
      .then( data => {
        setSearchData(data);
        console.log(data);
      }).catch( err => console.log(err));
  }


  const handleSubmit = (event) => {
    
    event.preventDefault();
    handleQuery();
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
              <Search />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SearchBar;
