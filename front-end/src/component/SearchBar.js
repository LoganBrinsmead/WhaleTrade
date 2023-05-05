import { useState, useEffect } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material"

import { redirect } from 'react-router-dom';

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  
  useEffect(() => {
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // route to results page
    redirect(`/search/:${searchText}`);
    //<Navigate to={`/search/:${searchText}`} replace={true}/>
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
