import { useState } from "react";


import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

function Side_slide(props)
{

    //const [toggle_b, set_toggle_b] = useState("one");

    function toggle_click(e, nextView) {
        if (nextView !== null) {
            props.set_drawer_page(nextView);
        }
        
    }

    return (
            <Box sx={{width: props.side_width}}>
                <ToggleButtonGroup
                    orientation="vertical"
                    exclusive
                    value={props.drawer_page}
                    onChange={toggle_click}
                    fullWidth={true}
                    >
                    {
                    props.page_list.map((element) => (
                        <ToggleButton key={crypto.randomUUID()} value={element}>
                            {element}
                        </ToggleButton>
                    ))
                    }

                </ToggleButtonGroup>
            </Box>

    );
}

export default Side_slide