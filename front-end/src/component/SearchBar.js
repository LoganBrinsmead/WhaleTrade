import { useState } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material"

import { getStockLookup } from '../services/api/whaletradApi';

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState({});

  console.log(searchData);

  const handleQuery = () => {
    getStockLookup(searchText)
        .then( response => {
          console.log(response.data);
          setSearchData(response.data);
        })
        .catch( error => {
          console.log(error);
        })
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
