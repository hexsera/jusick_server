import React from 'react';
import { useState, useRef, useContext } from 'react';
import { styled } from '@mui/material/styles';

import { Stock_full_data, save_data } from '../../Data/stock_data';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';




function make_stock_data(
    name, id, money, wantper, parent_id, item
)
{
    return {name, id, money, wantper, parent_id, item}
}


const Switch_m = styled(Switch)({
    padding: "8px",



    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#fff'
        },

        '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#ff3a30',
            opacity: 1
        }
    },


    '& .MuiSwitch-track': {
        borderRadius: 11,
    },

});



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

const test_data = [
    make_stock_data("한국", crypto.randomUUID(), 0, 30, "", [
        make_stock_data("한국은행주", crypto.randomUUID(), 0, 30, "", [
            make_stock_data("하나은행", crypto.randomUUID(), 0, 30, "", []),
            make_stock_data("국민은행", crypto.randomUUID(), 0, 30, "", []),
        ]),
        make_stock_data("배당주", crypto.randomUUID(), 0, 30, "", [
            make_stock_data("배당1", crypto.randomUUID(), 0, 30, "", []),
            make_stock_data("배당2", crypto.randomUUID(), 0, 30, "", []),
        ])
    ]),
    make_stock_data("미국", crypto.randomUUID(), 0, 30, "", [
        make_stock_data("미국은행주", crypto.randomUUID(), 0, 30, "", [
            make_stock_data("미국은행", crypto.randomUUID(), 0, 30, "", []),
            make_stock_data("미국2은행", crypto.randomUUID(), 0, 30, "", []),
        ]),
        make_stock_data("배당주", crypto.randomUUID(), 0, 30, "", [
            make_stock_data("배당11", crypto.randomUUID(), 0, 30, "", []),
            make_stock_data("배당22", crypto.randomUUID(), 0, 30, "", []),
        ])
    ]),
]

function Tables() {
    const full_table_data = useRef(useContext(Stock_full_data).current.item);
    //const full_table_data = useRef(test_data);
    const [tab_value, set_tab_value] = useState(0);

    const [frame_list, set_frame_list] = useState(full_table_data.current[tab_value].item);
    const [delete_on, set_delete_on] = useState(false);

    function new_frame() {
        full_table_data.current[tab_value].item = [...full_table_data.current[tab_value].item, make_stock_data("", crypto.randomUUID(), 0, 0, full_table_data.current[tab_value].id, [])];

        set_frame_list([...full_table_data.current[tab_value].item]);

    }

    function delete_frame(idx) {
        full_table_data.current[tab_value].item.splice(idx, 1);
        set_frame_list([...full_table_data.current[tab_value].item]);
    }

    function tab_change(e, value) {
        set_tab_value(value);
        set_frame_list([...full_table_data.current[value].item]);
    }


    return (
        <Box sx={{display:"flex", height: "100%", flexDirection: "column"}}>
            <Box sx={{display: 'flex', borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={tab_value} onChange={tab_change}>
                    {full_table_data.current.map((element, index)=> (
                        <Tab key={element.id} label={element.name} value={index}/>
                    ))}
                </Tabs>

            </Box>
            <Box sx={{}}>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: "5%"}}>
                            <Button onClick={()=>{
                                console.log(full_table_data.current)
                            }}>console
                            </Button>
                        </TableCell>
                        <TableCell align="center" sx={{width: "20%"}}>
                            name
                        </TableCell>
                        <TableCell align="center" sx={{width: "50%"}}>
                            money
                        </TableCell>
                        <TableCell align="center" sx={{width: "10%"}}>
                            wantper
                        </TableCell>
                        <TableCell sx={{width: "10%"}} align="right">
                            <Button variant="outlined" onClick={new_frame}>
                                make new
                            </Button>
                        </TableCell>
                        <TableCell sx={{width: "5%"}} align="right">
                            <Switch_m onChange={(e)=> {
                                e.target.checked ? set_delete_on(true) : set_delete_on(false)
                            }}/>
                        </TableCell>
                    </TableRow>
                    
                </TableHead>
                </Table>
            </Box>
        
            <Box sx={{height: "80%", overflowY: "scroll", flexGrow: 1}}>
                <Table>
                <TableBody>
                    {
                        frame_list.map((element, index) => (
                            <Stock_frame_Table key={element.id} 
                                stock_frame={full_table_data.current[tab_value].item[index]} delete_on={delete_on} idx={index} del_f={delete_frame}/>
                        ))
                    }
                    
                </TableBody>
                </Table>
            </Box>
        </Box>

    );
}

function Stock_frame_Table(props) {
    const [stock_list, set_stock_list] = useState(props.stock_frame.item);
    const [open, setopen] = useState(false);

    const [sum_money, set_sum_money] = useState(props.stock_frame.money);
    const [wantper, set_wantper] = useState(props.stock_frame.wantper);

    function new_stock ()
    {
        if (props.delete_on == false) 
        {
            props.stock_frame.item = [...props.stock_frame.item, 
                make_stock_data("", crypto.randomUUID(), 0, 0, props.stock_frame.id, [])];
            set_stock_list([...props.stock_frame.item]);
            

        }
        else
        {
            props.del_f(props.idx);
        }
        
    }
    
    function del_stock (idx)
    {
        if (props.delete_on == true)
        {
            props.stock_frame.item.splice(idx, 1);
            set_stock_list([...props.stock_frame.item]);
        }
        
    }

    function sum_money_func ()
    {
        let full_money = 0;
        for (const i of props.stock_frame.item)
        {
            //console.log(i.money);
            full_money += i.money;
        }
        set_sum_money(full_money);
        props.stock_frame.money = full_money;
    }

    function name_change(e)
    {
        props.stock_frame.name = e.target.value;
    }

    function wantper_change(e)
    {
        if (string_to_float(e.target.value) == true)
        {
            set_wantper(e.target.value);
            props.stock_frame.wantper = parseFloat(e.target.value);
            
        }
        else
        {
            set_wantper(wantper);
        }
}


    return (
        <React.Fragment>
            <TableRow>
                <TableCell sx={{width: "5%"}}>
                    <IconButton onClick={() => setopen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                    </IconButton>
                </TableCell>
                <TableCell sx={{width: "20%"}}>
                    <TextField fullWidth defaultValue={props.stock_frame.name}
                        onChange={name_change}/>
                </TableCell>
                <TableCell sx={{width: "50%"}}>
                    <Typography>{sum_money}</Typography>
                </TableCell>
                <TableCell sx={{width: "10%"}}>
                    <TextField value={wantper}
                        onChange={wantper_change}/>
                </TableCell>
                <TableCell sx={{width: "15%"}} align="right" colSpan={2}>
                    <IconButton color={props.delete_on ? "error" : "primary"} onClick={new_stock}>
                        {props.delete_on ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, padding: 0}} colSpan={6}>
                    <Collapse in={open}>
                        <Table>
                            <TableBody>
                                {
                                stock_list.map((element, index) => (
                                    <Stock_solo key={element.id} 
                                        idx={index} del_f={del_stock} stock={props.stock_frame.item[index]}
                                        delete_on={props.delete_on} sum_f={sum_money_func}/>
                                ))
                                }
                            </TableBody>
                            
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}

function Stock_solo(props) {
    const [money, set_money] = useState(props.stock.money);
    const [wantper, set_wantper] = useState(props.stock.wantper);

    function name_change(e) {
        props.stock.name = e.target.value;
    }

    function money_change(e) {
        if (string_to_float(e.target.value) == true)
        {
            set_money(e.target.value);
            props.stock.money = parseFloat(e.target.value);
            props.sum_f();
        }
        else
        {
            set_money(money);
        }

    }

    function wantper_change(e) {
        if (string_to_float(e.target.value) == true)
        {
            set_wantper(e.target.value);
            props.stock.wantper = parseFloat(e.target.value);
        }
        else
        {
            set_wantper(wantper);
        }

    }

    return (
            <TableRow >
                <TableCell sx={{width: "5%"}}/>
                <TableCell sx={{width: "20%"}}>
                    <TextField fullWidth defaultValue={props.stock.name}
                        onChange={name_change}/>
                </TableCell>
                <TableCell sx={{width: "50%"}}>
                    <TextField fullWidth value={money}
                        onChange={money_change}/>
                </TableCell>
                <TableCell  sx={{width: "10%"}}>
                    <TextField value={wantper}
                        onChange={wantper_change}/>
                </TableCell>
                <TableCell sx={{width: "15%"}} colSpan={2} align="right">
                    <IconButton disabled={false} color="error" onClick={() => {
                        props.del_f(props.idx)
                    }}>
                        <DeleteIcon color={props.delete_on ? "error" : "disabled"}/>
                    </IconButton>
                </TableCell>
                
            </TableRow>
    );
}

export default Tables;