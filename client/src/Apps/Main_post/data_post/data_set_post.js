import React, { useState, useContext} from "react";
import dayjs from 'dayjs';

import { Stock_full_data, Stock_full_data_opt } from "../../Data/stock_data.js";
import { axios_get_data_list, axios_get_data_delete, axios_get_data_load } from "../../Server/client_call_server.js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



function Data_set_post(props) {
    const cont_stock_full_data_opt = useContext(Stock_full_data_opt)
    const cont_stock_full_data = cont_stock_full_data_opt.ref;
    
    //const [date, set_date] = useState(dayjs(cont_stock_full_data.current.date));
    const [date_list, set_date_list] = useState([]);

    function date_chagne (newValue)
    {
        //console.log(dayjs(newValue).format("YY-MM-DD"));
        cont_stock_full_data.current.date = dayjs(newValue).format("YYYY-MM-DD");
        console.log(cont_stock_full_data.current);
        props.set_date(dayjs(newValue).format("YYYY-MM-DD"));
        
    }

    async function list_call_click()
    {
        const list = await axios_get_data_list(cont_stock_full_data_opt.user_id);
        set_date_list([...list]);
    }

    async function delete_click()
    {
        await axios_get_data_delete(props.date, cont_stock_full_data_opt.user_id);
    }

    async function list_date_load(date)
    {
        const data = await axios_get_data_load(date, cont_stock_full_data_opt.user_id);
        const data_json = JSON.parse(data.data);
        cont_stock_full_data_opt.ref.current = data_json;
        cont_stock_full_data_opt.update({...cont_stock_full_data_opt.ref.current});
        props.set_date(cont_stock_full_data.current.date);
    }

    return(
        <Box>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={dayjs(props.date)} onChange={date_chagne}/>
                </LocalizationProvider>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Button onClick={list_call_click}>
                        full_data
                    </Button>
                    {date_list.map((element) => (
                        <Date_list_button key={element} date={element} load_func={list_date_load}/>

                    ))}
                </Box>
            </Box>
            <Box>
                <Button variant="outlined" color="error"
                    onClick={delete_click}>
                    {"delete " + props.date}
                </Button>
            </Box>
            
            
        </Box>
    )
}

function Date_list_button(props)
{

    function button_click()
    {
        props.load_func(props.date)
    }

    return (
        <Button onClick={button_click}>
            {props.date}
        </Button>
    )
}

export default Data_set_post;