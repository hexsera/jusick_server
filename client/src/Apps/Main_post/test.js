import React from 'react';
import { useState, useEffect, useRef } from 'react';

import Button from '@mui/material/Button';
import axios from 'axios';

function Test_one() {
    
    function conclick (e)
    {
        axios.get("http://localhost:8000/test")
            .then((response) => {
                console.log("GEt!");
                console.log(JSON.parse(response.data));
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <Button onClick={conclick}>
            console
        </Button>
    );
}

export default Test_one;