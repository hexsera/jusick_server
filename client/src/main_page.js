import React, {useState, useContext, createContext, useRef, useSyncExternalStore} from "react";
import styled from "styled-components";
import axios from 'axios';

import { full_data, new_data, Stock_full_data, Stock_full_data_opt } from "./Apps/Data/stock_data.js";
import {axios_post_data_save, axios_get_data_load} from "./Apps/Server/client_call_server.js"

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";

import Side_slide from './Apps/Side/side_slide.js';
import Input_post from "./Apps/Main_post/Input_post/input_post.js";
import Tables from './Apps/Main_post/table/table.js'
import Data_set_post from "./Apps/Main_post/data_post/data_set_post.js";
import Result_post from "./Apps/Main_post/result_post/result_post.js";
import Global_setting_post from "./Apps/Main_post/global_data_post/global_setting_post.js";

const page_names = ["global_setting", "table", "result_data", "data_set"]


function Main_page_return(props)
{
    if (props.page_name == "table")
    {
        return (
            <Tables />
        )
    }
    else if (props.page_name == "result_data")
    {
        return (
            <Result_post data={props.data}/>
        )
    }

    else if (props.page_name == "data_set")
    {
        return (
            <Data_set_post date={props.date} set_date={props.set_date}/>
        )
    }

    else if (props.page_name == "global_setting")
    {
        return (
            <Global_setting_post />
        )
    }
}


function Main_layout(props)
{
    const [save_data, set_save_data] = useState();
    const cot_full_data = save_data;
    const cot_full_data_opt = {ref: useRef(new_data()), update: set_save_data, user_id: props.login_id};
    const [date, set_date] = useState(cot_full_data_opt.ref.current.date);
    //cot_full_data_opt.update({...cot_full_data_opt.ref.current});

    //const cot_full_data = [useRef(new_data())];
    const [d_open, set_d_open] = useState(false);
    const [drawer_page, set_drawer_page] = useState(page_names[0]);

    const drawer_toggle = (tog) => () => {
        set_d_open(tog)
    };

    const side_width = 250

    return(
        <>
            <Stock_full_data.Provider value={cot_full_data}>
                <Stock_full_data_opt.Provider value={cot_full_data_opt}>
                <Box sx={{ display: 'flex'}}>

                
                    <Drawer variant="permanent" anchor="left"
                        sx={{width: side_width}}>
                        <Side_slide side_width={side_width} page_list={page_names} 
                            drawer_page={drawer_page} set_drawer_page={set_drawer_page}/>
                    </Drawer>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%"}}>
                        <Box position='sticky' sx={{top:'0px', height: "10vh"}}>
                            <Head_post date={date}/>
                        </Box>

                        {

                        }
                        <Box sx={{width: "100%", overflow: 'auto', height: "90vh"}}>
                            
                            <Main_page_return page_name={drawer_page} data={cot_full_data_opt.ref}
                                date={date} set_date={set_date}/>

                            
                        </Box>
                    </Box>
                    
                </Box>
                </Stock_full_data_opt.Provider>
            </Stock_full_data.Provider>
            
        </>
            
    );
}

function Head_post(props)
{
    const cont_stock_full_data = useContext(Stock_full_data_opt);

    async function save_click ()
    {
        //console.log("save_date", cont_stock_full_data.ref.current.date);

        axios_post_data_save(cont_stock_full_data.ref.current, cont_stock_full_data.user_id);
        //console.log("save");
        cont_stock_full_data.update({...cont_stock_full_data.ref.current});
    }

    async function load_click()
    {

        //console.log("load_date", cont_stock_full_data.ref.current.date);
        //const data = await axios.get("http://localhost:8000/data/load", { params: {date: cont_stock_full_data.ref.current.date}});
        const data = await axios_get_data_load(cont_stock_full_data.ref.current.date, cont_stock_full_data.user_id);
        const data_json = JSON.parse(data.data);
        if (data_json.date == "new")
        {
            //console.log("new");
            cont_stock_full_data.ref.current = new_data(cont_stock_full_data.ref.current.date);
            //cont_stock_full_data = useRef({...cont_stock_full_data.current});
        }
        else
        {
            console.log(data_json);
            cont_stock_full_data.ref.current = data_json;
        }
        cont_stock_full_data.update({...cont_stock_full_data.ref.current});
    }

    function console_click()
    {
        console.log(cont_stock_full_data.ref.current);
        cont_stock_full_data.update({...cont_stock_full_data.ref.current});
    }

    return (
        <>
            <Button onClick={save_click}>
                save
            </Button>
            <Button onClick={load_click}>
                load
            </Button>
            <Button onClick={console_click}>
                console
            </Button>
            {props.date}
        </>
    )
}


export default Main_layout;