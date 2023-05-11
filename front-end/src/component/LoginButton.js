import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function LoginButton() {
  return (
    <Button variant="contained" component={Link} to="/login">
      Login
    </Button>
  );
}

export default LoginButton;
