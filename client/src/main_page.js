import React, {useState, useContext, useRef, useSyncExternalStore} from "react";
import styled from "styled-components";
import axios from 'axios';

import { Stock_full_data, full_data } from "./Apps/Data/stock_data.js";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";

import Side_slide from './Apps/Side/side_slide.js';
import Input_post from "./Apps/Main_post/Input_post/input_post.js";
import Tables from './Apps/Main_post/table/table.js'
import Data_set_post from "./Apps/Main_post/data_post/data_set_post.js";

const page_names = ["table", "data_set"]

function main_page_return(page_name)
{
    if (page_name == page_names[0])
    {
        return (
            <Tables />
        )
    }
    else if (page_name == page_names[1])
    {
        return (
            <Data_set_post />
        )
    }
}


function Main_layout()
{
    const cot_full_data = useRef(full_data);
    const [d_open, set_d_open] = useState(false);
    const [drawer_page, set_drawer_page] = useState(page_names[0]);

    const drawer_toggle = (tog) => () => {
        set_d_open(tog)
    };

    const side_width = 250

    return(
        <>
            <Stock_full_data.Provider value={cot_full_data}>
                <Box sx={{ display: 'flex'}}>

                
                    <Drawer variant="permanent" anchor="left"
                        sx={{width: side_width}}>
                        <Side_slide side_width={side_width} page_list={page_names} 
                            drawer_page={drawer_page} set_drawer_page={set_drawer_page}/>
                    </Drawer>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%"}}>
                        <Box position='sticky' sx={{top:'0px', height: "10vh"}}>
                            <Head_post />
                        </Box>

                        {

                        }
                        <Box sx={{width: "100%", overflow: 'auto', height: "90vh"}}>
                            {
                                main_page_return(drawer_page)
                            }
                        </Box>
                    </Box>
                    
                </Box>
            </Stock_full_data.Provider>
            
        </>
            
    );
}

function Head_post()
{
    const cont_stock_full_data = useContext(Stock_full_data);
    function save_click ()
    {
        //console.log(cont_stock_full_data.current);
        //
        axios.post("http://localhost:8000/get", 
            {data: JSON.stringify(cont_stock_full_data.current)}
        )
            .then((res) => {
                console.log("post!");
            })
            .catch((error) => {
                console.log(error);
            });
        
    }
    function load_click()
    {
        axios.get("http://localhost:8000/test")
            .then((response) => {
                console.log("GEt!");
                const get_data = JSON.parse(response.data);
                //console.log(JSON.parse(response.data));
                cont_stock_full_data.current = get_data;
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <>
            <Button onClick={save_click}>
                save
            </Button>
            <Button onClick={load_click}>
                load
            </Button>
        </>
    )
}


export default Main_layout;