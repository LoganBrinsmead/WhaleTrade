import React from "react";
import Box from '@mui/material/Box'
import Logo from './Logo'
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import HamburgerMenu from "./HambergerMenu"
import Login from "./Login";
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
}


const searchBarStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",

};


const profileStyle = {
  position: "absolute",
  right: "80px",
  top : '10px',
}


const loginStyle = {
    position: "absolute",
    right: "100px",
    top: '1'
 
}



const hambutgerStyle = {
  position: "absolute", 
  right: "5px",
  top : '6px',
}


const ButtonStyle = {
    position: "absolute", 
    right: "75px",
    top : '10px',
}



function Header()  {
  return (
    <Box component="span" sx = {headerStyle}>
      <Box sx = {logoStyle}>
        <Logo />
      </Box>
      
      <Box sx = {searchBarStyle}>
        <SearchBar />
      </Box>

      <Box sx = {profileStyle}>
       
      </Box>

      <Box sx = {ButtonStyle}>
        <LoginButton />
      </Box>
      
      <Box sx = {hambutgerStyle}>
       
      </Box>

  

    
    </Box>
  
)
}


export default Header