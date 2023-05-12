import React, { useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

//import API from './API_Interface/API_Interface'

/*
const logoStyle = {
  position: "absolute",
  margin: "10px",
};
*/

function Login({ setUser }) {
  const [userName, setuserName] = useState(""); //userName
  const [password, setPassword] = useState(""); //Password
  const [noitice, setNotice] = useState("");
  const [verifyUser, setVerifyUser] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const handleuserNameInputChange = (event) => {
    setuserName(event.target.value);
    setAuthFailed(false);
    if (event.key === "Enter") {
      console.log("handleKeyPress: Verify user input.");
      setVerifyUser(true);
    }
  };

  //     useEffect(()=>{
  //         if (!verifyUser || userName.length === 0 || password.length === 0) return
  //         const api = new API();
  //         async function getUserInfo(){
  //             api.getUserInfo(userName,password)
  //                 .then(userInfo => {
  //                     console.log(`api returns user info: ${JSON.stringify(userInfo)}`)
  //                     const user = userInfo.user;
  //                     if(userInfo.status === 'OK'){

  //                         setUser(user);
  // //                        console.log(`User infor: ${user.Name}`)
  //                         navigate("/home");
  //                     }else {
  //                         console.log("Wrong username or password")
  //                         setNotice('Wrong user or password')
  //                         setVerifyUser(false)
  //                         setAuthFailed(true)
  //                     }
  //                 })
  //         }
  //         getUserInfo()

  //     },[navigate,setUser,verifyUser,userName,password])

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
    setAuthFailed(false);

    if (event.key === "Enter") {
      setVerifyUser(true);
    }
  };

  function handleClick() {
    if (userName && password) {
      setVerifyUser(true);
    } else {
      setAuthFailed(true);
    }
  }

  function handleSignUpClick() {
    navigate("/signUp");
  }

  return (
    <Fragment>
      <Box>
        <Logo />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={10}
      >
        <Typography variant="h3" sx={{ fontFamily: "Monospace" }}>
          Whale Trade
        </Typography>
        <Divider />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <Typography variant="h5" sx={{ fontFamily: "Monospace" }}>
          {noitice}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <TextField
          error={authFailed}
          id="outlined-error-helper-text"
          label="User Name"
          placeholder=""
          value={userName}
          onChange={handleuserNameInputChange}
          style={{ width: 300 }}
        />
        <Divider />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={1}
      >
        <TextField
          error={authFailed}
          id="outlined-error-helper-text"
          label="Password"
          placeholder=""
          value={password}
          onChange={handlePasswordInputChange}
          type="password" // Set the type to "password"
          style={{ width: 300 }}
        />

        <Divider />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <Button variant="contained" size="medium" onClick={handleClick}>
          Sign In
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <Typography variant="body1">
          Don't have an account?{" "}
          <Link href="#" onClick={handleSignUpClick} color="primary">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Fragment>
  );
}

export default Login;
