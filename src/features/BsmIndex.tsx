import {Stack} from "@mui/material";
import {Outlet} from "react-router-dom";


const BsmIndex = () => {

    return (
        <Stack direction="row" sx={{height: "100%", width: "100%"}}>
            <Outlet/>
        </Stack>
    )
};


export {BsmIndex};
