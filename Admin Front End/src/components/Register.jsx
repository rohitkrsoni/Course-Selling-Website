import { Typography, TextField, Button, FormControlLabel, Checkbox, Fade } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [errorUsername, setErrorUserName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const resetFields = () => {
        setUserName("");
        setPassword("");
        setConfirmPassword("");
    }

    const onSignUpClickHandler = async () => {
        if (validateTextFields()) {
            // on click handler
            var response = await fetch("http://localhost:3000/admin/signup", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
            if (response.status === 200) {
                response.json().then((message) => {
                    window.alert(message.message);
                    window.localStorage.setItem('token', message.token);
                    resetFields();
                    navigate('/login');
                })
            }
            else {
                response.json().then((message) => {
                    window.alert(message.message);
                    resetFields();
                })
            }
        }
    }

    const validateTextFields = () => {
        var a = validateUserName()
        var b = validatePassword()
        var c = validateConfirmPassword()
        return a && b && c;
    }

    const validateUserName = () => {
        if (username.length < 5 || username.length > 20) {
            setErrorUserName(true);
            return false
        } else {
            setErrorUserName(false);
            return true
        }
    }

    const validatePassword = () => {
        if (password.length < 6 || password.length > 12) {
            setErrorPassword(true);
            return false
        } else {
            setErrorPassword(false);
            return true
        }
    }

    const validateConfirmPassword = () => {
        if (confirmPassword != password) {
            setErrorConfirmPassword(true);
            return false
        } else {
            setErrorConfirmPassword(false);
            return true
        }
    }

    return <div style={{
        'width': '30%',
        'margin': '7% auto'
    }}>
        <Card variant="outlined" >
            <CardContent style={{
                'display': 'flex',
                'flexDirection': 'column',
                'gap': '10px',
            }}>
                <Typography variant={'h5'} align='center' color={'blue'}>COURSERA</Typography>
                <Typography variant={'h6'} align='center'>Sign Up</Typography>
                <div align='center' style={{
                    'marginTop': '10px',
                    'marginBottom': '10px',
                    'display': 'flex',
                    'flexDirection': 'column',
                    'gap': '10px',
                    'width': "90%",
                    'margin': 'auto'
                }}>
                    <TextField error={errorUsername} helperText={errorUsername ? "Username should be between 5-20 characters" : ""} value={username} onChange={(e) => setUserName(e.target.value)} id="outlined-basic-username" label="Username" variant="outlined" size={'small'} type={'text'} fullWidth />
                    <TextField error={errorPassword} helperText={errorPassword ? "Password should be between 6-12 characters" : ""} value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic-password" label="Password" variant="outlined" size={'small'} type={'password'} fullWidth />
                    <TextField error={errorConfirmPassword} helperText={errorConfirmPassword ? "Passwords not matching" : ""} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="outlined-basic-confirm-password" label="Confirm Password" variant="outlined" size={'small'} type={'password'} fullWidth />
                    <Button variant={'contained'} onClick={onSignUpClickHandler}>Sign Up</Button>
                    <Typography variant={'body1'} color={'blue'} align={'left'} >Already have an account? Sign In</Typography>
                </div>

            </CardContent>
        </Card>
    </div>
}

export default Register;