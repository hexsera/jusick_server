import React, {useState, useContext} from "react";

import { Stock_full_data, Stock_full_data_opt, save_data, make_stock_data } from '../../Data/stock_data';

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


function string_to_float(input)
{
    let com = false;
    if (typeof(input) == 'string')
    {

        for (const i of input)
        {
            //console.log(i);
            //console.log(isNaN(Number(i)));
            if (isNaN(Number(i)))
            {
                if (i == "." && com != true)
                {
                    com = true;
                }
                else
                {
                    return false;
                }
            }
            else if (i == " ")
            {
                return false;
            }
        }
        return true;
    }
    else
    {
        return false;
    }
    
}


function Global_setting_post()
{
    const stock_full_data_opt = useContext(Stock_full_data_opt).ref;
    const [global_list, set_global_list] = useState(stock_full_data_opt.current.item);


    function add_global_stock()
    {
        stock_full_data_opt.current.item = [...stock_full_data_opt.current.item, 
            make_stock_data("", crypto.randomUUID(), 0, 0, stock_full_data_opt.current.id, [])
        ]
        set_global_list([...stock_full_data_opt.current.item]);
    }

    function delete_click(idx)
    {
        //console.log("del");
        stock_full_data_opt.current.item.splice(idx, 1);
        set_global_list([...stock_full_data_opt.current.item]);
    }

    return (
        <Box>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{width: "70%"}}>
                                name
                            </TableCell>
                            <TableCell align="center" sx={{width: "20%"}}>
                                wantper
                            </TableCell>
                            <TableCell align="center" sx={{width: "10%"}}>
                                <IconButton color="primary" onClick={add_global_stock}>
                                    <AddIcon/>
                                </IconButton>
                                
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Box>
            <Box>
                <Table>
                    <TableBody>
                        {
                            global_list.map((element, index) => (
                                <Global_stock key={element.id} ele={element}
                                    delete_func={delete_click} idx={index}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

function Global_stock(props)
{

    const [wantper, set_wantper] = useState(props.ele.wantper);

    function name_change(e)
    {
        props.ele.name = e.target.value;
    }

    function per_change(e)
    {
        if (string_to_float(e.target.value) == true)
        {
            props.ele.wantper = parseFloat(e.target.value);
            set_wantper(e.target.value);
        }
        else
        {
            set_wantper(wantper);
        }
    }


    

    return (
        <TableRow>
            <TableCell sx={{width: "70%"}}>
                <TextField fullWidth onChange={name_change}
                    defaultValue={props.ele.name}/>
            </TableCell>
            <TableCell sx={{width: "20%"}}>
                <TextField fullWidth onChange={per_change}
                    value={wantper} />
            </TableCell>
            <TableCell align="center" sx={{width: "10%"}}>
                <IconButton color="error"
                    onClick={()=> {props.delete_func(props.idx)}}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Global_setting_post;