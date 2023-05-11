import React from "react";
import { Avatar, Box, Typography } from "@mui/material";



const Profile = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Avatar sx={{ mr: 1 }}>U</Avatar>
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      User Name
    </Typography>
  </Box>
);


export default Profile