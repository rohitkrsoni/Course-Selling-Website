import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Appbar = ({ loggedIn, setLoggedIn }) => {

    const signInClickHandler = () => {
        window.location.assign("/login")
    }

    const signUpClickHandler = () => {
        window.location.assign("/register")
    }

    const signOutClickHandler = () => {
        window.localStorage.removeItem('token');
        setLoggedIn(false)
        window.location.assign("/login")
    }

    return <div style={{
        'display': 'flex',
        'justifyContent': 'space-between',
        'alignItems': 'center',
        'borderBottom': '2px solid #f6f6f6',
        'padding': '10px'

    }}>
        <Typography variant={'h5'} color={'blue'} letterSpacing={'2px'} style={{ 'verticalAlign': 'centre' }}>
            COURSERA
        </Typography>

        {!loggedIn && (
            <div style={{
                'display': 'flex',
                'width': '12%',
                'flexDirection': 'row-reverse',
                'justifyContent': 'space-between'
            }}>
                <Button variant={'outlined'} size={'small'} onClick={signInClickHandler} >SignIn</Button>
                <Button variant={'outlined'} size={'small'} onClick={signUpClickHandler} >SignUp</Button>
            </div>
        )}
        {loggedIn && (
            <Button variant={'outlined'} size={'small'} onClick={signOutClickHandler} >Sign Out</Button>
        )
        }
    </div >
}

export default Appbar;