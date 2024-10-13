import React, {useState} from "react";

import Box from "@mui/material/Box"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Typography from "@mui/material/Typography";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function float_for_str(flt ,per = false, fix = 2)
{
    let str = ""
    if (flt > 0)
    {
        str = "+" + flt.toFixed(fix)
    }
    else
    {
        str = flt.toFixed(fix)
    }

    if (per == true)
    {
        str = str + "%";
    }
    return str;
}

function Table_cells(props)
{

    function float_color(num)
    {
        if (num == 0)
        {
            return 'textDisabled'
        }
        else if(num > 0)
        {
            return 'success'
        }
        else
        {
            return 'error'
        }
    }

    

    return(
        <>
            <TableCell  sx={{width: "30%"}} >
                {props.name}
            </TableCell>
            <TableCell sx={{width: "20%"}}>
                {props.my_money}
            </TableCell>
            <TableCell sx={{width: "20%"}}>
                <Typography color={float_color(props.my_need_money)}>
                    {float_for_str(props.my_need_money, false, 0)}
                </Typography>
            </TableCell>
            <TableCell sx={{width: "10%"}}>
                <Typography color={float_color(props.my_per)}>
                    {float_for_str(props.my_per, true)}
                </Typography>
            </TableCell>
            <TableCell sx={{width: "10%"}}>
                <Typography color={float_color(props.my_need_per)}>
                    {float_for_str(props.my_need_per, true)}
                </Typography>
            </TableCell>
        </>
    )
}


function Result_post(props)
{
    const [full_data, set_full_data] = useState(props.data.current);
    const [tab_value, set_tab_value] = useState(0);

    const [result_data, set_result_data] = useState(full_data.item[tab_value]);
    //console.log(full_data.date);

    let full_money = 0;
    for (const i of full_data.item)
    {
        full_money = full_money + i.money
    }

    
    

    function tab_change(e, value)
    {
        set_tab_value(value);
        set_result_data(full_data.item[value]);
    }


    return (
        <Box sx={{display: "flex", height: "100%", width: "100%", flexDirection: "column"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider',  width: "100%"}}>
                <Tabs value={tab_value} onChange={tab_change}>
                    {
                        full_data.item.map((element, index) => (
                            <Tab key={element.id} value={index} label={element.name}/>
                    ))
                    }
                    
                </Tabs>
                
                
            </Box>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: "20px"}}>

                            </TableCell>
                            <TableCell align="center"
                                sx={{width: "30%"}}>
                                name
                            </TableCell>
                            <TableCell align="center"
                                sx={{width: "20%"}}>
                                money
                            </TableCell>
                            <TableCell align="center"
                                sx={{width: "20%"}}>
                                need_money
                            </TableCell>
                            <TableCell align="center"
                                sx={{width: "10%"}}>
                                per
                            </TableCell>
                            <TableCell align="center"
                                sx={{width: "10%"}}>
                                need_per
                            </TableCell>
                            <TableCell sx={{padding: "0px", width: "17px"}}></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Box>
            <Box sx={{ overflowY: "scroll", flexGrow: 1}}>
                {
                    <Global_result result_data={result_data} full_money={full_money}/>
                }
                
            </Box>
            
        </Box>
    )
}

function Global_result(props)
{
    
    let my_money = props.result_data.money;
    let my_per = (my_money/props.full_money)*100;
    let my_needper = props.result_data.wantper - my_per;
    let my_need_money = props.full_money*(props.result_data.wantper/100) - my_money;

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>

                    </TableCell>
                    <Table_cells name={props.result_data.name} my_money={my_money}
                my_need_money={my_need_money} my_per={my_per} my_need_per={my_needper}/>

                </TableRow>
                {
                    props.result_data.item.map((element, idx) => (
                        <Stock_frame_result ele={element} key={element.id}
                        full_need_money={my_money+my_need_money} full_money={my_money}/>
                    ))
                }
            </TableBody>
        </Table>
    )

}

function Stock_frame_result(props)
{
    //const [full_data, set_full_data] = useState();

    const [table_open, set_table_open] = useState(false);

    let my_money = 0;
    let my_need_money = 0;
    let my_per = 0;
    let my_need_per = 0;

    my_money = props.ele.money;
    my_per = (my_money / props.full_money) * 100;
    my_need_per = props.ele.wantper - my_per;

    my_need_money = props.full_need_money * (props.ele.wantper / 100) - my_money;

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton onClick={()=> (table_open ? set_table_open(false) : set_table_open(true))}>
                        {table_open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <Table_cells name={props.ele.name} my_money={my_money}
                my_need_money={my_need_money} my_per={my_per} my_need_per={my_need_per}/>
                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, padding: 0}} colSpan={6}>
                    <Collapse in={table_open}>
                        <Table>
                            <TableBody>
                                {
                                props.ele.item.map((element) => (
                                    <Stock_result key={element.id}
                                    ele={element} full_money={my_money} 
                                    full_need_money={my_need_money+my_money} />
                                ))
                                }
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}


function Stock_result(props)
{

    let my_money = 0;
    let my_need_money = 0;
    let my_per = 0;
    let my_need_per = 0;

    my_money = props.ele.money;
    my_per = (my_money / props.full_money) * 100;
    my_need_per = props.ele.wantper - my_per;

    my_need_money = props.full_need_money * (props.ele.wantper / 100) - my_money;
    return (
        <TableRow>
            <TableCell>

            </TableCell>
            <Table_cells name={props.ele.name} my_money={my_money}
                my_need_money={my_need_money} my_per={my_per} my_need_per={my_need_per}/>
        </TableRow>
    )
}
/*
<TableCell>
                {props.ele.name}
            </TableCell>
            <TableCell>
                {my_money}
            </TableCell>
            <TableCell>
                <Typography>
                    {my_need_money.toFixed(0)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {float_for_per(my_per)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {float_for_per(my_need_per)}
                </Typography>
            </TableCell>
*/

export default Result_post;