import {bsmConstants} from "@common/bsmConstants.ts";
import {EntryIndexContext} from "@features/entry/EntryIndexComp.tsx";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import {useOutletContext} from "react-router-dom";


const EntryTreeComp = () => {
    const {onEntryClick, entryList}: EntryIndexContext = useOutletContext();

    return (
        <List>
            {entryList?.map((entry) => (
                    <React.Fragment key={entry.id}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => onEntryClick(entry)}>
                                <ListItemIcon>{/*sx={{minWidth: "calc(4.5 * var(--mui-spacing, 8px))"}}*/}
                                    {entry.entryType === bsmConstants.ENTRY_TYPE_DIRECTORY ? <FolderOutlinedIcon/> : <ArticleOutlinedIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={entry.path.entryName}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                ))}
        </List>
    );
};

export {EntryTreeComp};