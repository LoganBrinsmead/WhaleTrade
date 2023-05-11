import React, { useState } from "react";
import Box from '@mui/material/Box';
import Logo from './Logo';
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import HamburgerMenu from "./HambergerMenu"
import LoginButton from "./LoginButton";

const headerStyle = {
  backgroundColor: "white",
  width: '100%',
  height: '120px',
  display: 'flex',
  position: 'relative'
};

const logoStyle = {
  position: "absolute",
  margin : "10px"
};

const searchBarStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
};

const profileStyle = {
  position: "absolute",
  right: "80px",
  top : '10px',
};

const buttonStyle = {
  position: "absolute", 
  right: "75px",
  top : '10px',
};

const hamburgerStyle = {
  position: "absolute", 
  right: "5px",
  top : '6px',
};

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Box component="span" sx={headerStyle}>
      <Box sx={logoStyle}>
        <Logo />
      </Box>
      
      <Box sx={searchBarStyle}>
        <SearchBar />
      </Box>

      <Box sx={buttonStyle}>
        {isLoggedIn ? <Profile /> : <LoginButton onLogin={handleLogin} />}
      </Box>
      
      <Box sx={hamburgerStyle}>
        <HamburgerMenu />
      </Box>
    </Box>
  );
}

export default Header;
