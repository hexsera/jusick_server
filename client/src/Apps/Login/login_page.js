import React, {useState} from 'react';

import {axios_get_user} from '../Server/client_call_server.js'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

function Login_page(props)
{
    const [user_id, set_user_id] = useState();
    const [snack_open, set_snack_open] = useState(false);
    
    function id_change(e)
    {
        set_user_id(e.target.value);
    }

    async function button_click()
    {
        const id_state = await axios_get_user(user_id);
        if (id_state == true)
        {
            props.set_login(true);
            props.login_id.current = user_id;
            console.log(props.login_id.current);
        }
        else
        {
            set_snack_open(true);
            //props.set_login(true);
        }
    }
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center",
            width: "100vw", height: "100vh"}}>
            <Card sx={{
                width: "400px", height: "400px"}}>
                <Box sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center",
                    height: "40%"}}>
                    <Box sx={{height: "40%"}} />
                    <Typography color="primary" sx={{fontSize: '40px'}}>WHELL COME</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection:"column", alignItems: "center",
                    height: "60%"
                }}>
                    <Box sx={{height: "20%"}}/>
                    <TextField sx={{width: "80%"}} onChange={id_change}/>
                    <Box sx={{height: "10%"}}/>
                    <Button sx={{width: "100px", height: "40px"}} variant='outlined'
                        onClick={button_click}
                    > Login! </Button>
                </Box>
            </Card>
            <Snackbar open={snack_open} autoHideDuration={2000} onClose={()=>{set_snack_open(false)}}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <SnackbarContent sx={{backgroundColor: "#ef5350"}}
                    message="존재하지 않는 ID입니다."
                />
            </Snackbar>

        </Box>
    )
}

export default Login_page;