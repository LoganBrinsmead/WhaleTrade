import React, {useState, useEffect, Fragment} from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
//import API from '../API_Interface'
import Logo from './Logo'




const logoStyle = {
    position: "relative",
    margin : "10px"
  }
  



export default function SignUp() {
    const [userName, setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [signUp, setSignUp] = useState(false)
    const [noitice, setNotice] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const navigate = useNavigate();
    




    // useEffect(()=>{
    //     if (!verifyUser || email.length === 0 || name.length === 0, password.length === 0) return
    //     const api = new API();
    //     async function signUp(){
    //         api.addUser(email,name,password)
    //            .then(userInfo => { 
    //                 console.log(`api returns user info: ${JSON.stringify(userInfo)}`)
    //                 navigate("/");  
                 
    //             })
    //     }
    //     signUp()
    
    // },[signUp])


    function handleClick(password,passConfirm) {
       if(password !== passConfirm){
         setNotice('Password not match, please enter again !')
       } else (
        setSignUp(true)
       )
    };




    const handleNameInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserName(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };


    const handleEmailInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setEmail(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handlePasswordInputChange = event => {
        console.log("handleInputChange called.");



        setPassword(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleRepeatPasswordInputChange = event => {
        console.log("handleInputChange called.");


        setPassConfirm(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };






    return (
        <Fragment>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>
                <Box sx = {logoStyle}>
                    <Logo />
                </Box>

                <Typography variant="h3" sx={{ fontFamily: 'Monospace' }}>
                    Whale Trade
                </Typography>
                <Box sx = {logoStyle}>
                    <Logo />
                </Box>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
                    {noitice}
                </Typography>
              
            </Box>


            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Email Address"
                    placeholder=""
                    value={email}
                    onChange={handleEmailInputChange}
                    style = {{width: 300}}
                />
            <Divider/>
            </Box>



            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="User Name"
                    placeholder=""
                    value={userName}
                    onChange={handleNameInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>



            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Password"
                    placeholder=""
                    value={password}
                    onChange={handlePasswordInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Confirm Password"
                    placeholder=""
                    value={passConfirm}
                    onChange={handleRepeatPasswordInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    
                    variant="contained"
                    size="medium"
                    onClick={(e) => handleClick(password,passConfirm)}
                >Sign Up</Button>
            </Box>

        </Fragment>

    );
}

