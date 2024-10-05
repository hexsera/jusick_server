import React, { useState, useContext} from "react";
import dayjs from 'dayjs';

import { Stock_full_data } from "../../Data/stock_data.js";

import Box from "@mui/material/Box";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



function Data_set_post() {
    const [date, setdate] = useState(dayjs());
    const cont_stock_full_data = useContext(Stock_full_data);

    function date_chagne (newValue)
    {
        //console.log(dayjs(newValue).format("YY-MM-DD"));
        cont_stock_full_data.current.date = dayjs(newValue).format("YY-MM-DD");
        console.log(cont_stock_full_data.current);
        
    }
    return(
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={date} onChange={date_chagne}/>
            </LocalizationProvider>
            
        </Box>
    )
}

export default Data_set_post;