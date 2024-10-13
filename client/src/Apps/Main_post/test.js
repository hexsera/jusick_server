import React from 'react';
import { useState, useEffect, useRef, useContext, createContext } from 'react';

import Button from '@mui/material/Button';
import axios from 'axios';


const C_data = createContext();
const C_s_data = createContext();


function Test_one() {
    const sub_r = useRef(1);

    const [ss, s_ss] = useState(1);
    const c_data = ss;

    const c_s_data = {re: sub_r, s: s_ss};

    function conclick (e)
    {
        c_s_data.s(2);
    }

    return (
        <C_data.Provider value={c_data}>
            <C_s_data.Provider value={c_s_data}>
            <Button onClick={conclick}>
                console
            </Button>
            {c_data}
            </C_s_data.Provider>
        </C_data.Provider>
    );
}

export default Test_one;