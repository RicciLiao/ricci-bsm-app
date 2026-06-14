import {bsmConstants} from "@common/bsmConstants.ts";
import {AddDialogComp} from "@features/entry/AddDialogComp.tsx";
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import FolderOutlined from "@mui/icons-material/FolderOutlined";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from "@mui/material";
import React from "react";


const AddButtonComp = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [addType, setAddType] = React.useState(0);

    const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAddMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddDialogOpen = (type: number) => {
        handleAddMenuClose();
        setDialogOpen(true);
        setAddType(type);
    }

    const handleAddDialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <React.Fragment>
            <Button
                onClick={handleAddButtonClick}
                sx={{textTransform: "none"}}
            >
                Add
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleAddMenuClose}
            >
                <MenuList>
                    <MenuItem onClick={() => handleAddDialogOpen(bsmConstants.ENTRY_TYPE_DIRECTORY)}>
                        <ListItemIcon>
                            <FolderOutlined/>
                        </ListItemIcon>
                        <ListItemText>Folder</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleAddDialogOpen(bsmConstants.ENTRY_TYPE_FILE)}>
                        <ListItemIcon>
                            <ArticleOutlined/>
                        </ListItemIcon>
                        <ListItemText>Article</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
            <AddDialogComp open={dialogOpen} onClose={handleAddDialogClose} addType={addType}/>
        </React.Fragment>
    );
};

export {AddButtonComp};