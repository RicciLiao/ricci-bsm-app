import {AppMenuItem} from "@interfaces/AppMenuItem.ts";
import {Box, Button, Popper} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AppMenuContext} from "@/components/menu/AppMenu.tsx";

const NestedMenu = ({menu, parentPath, closeAllMenus}: {
    menu: AppMenuItem;
    parentPath: string[];
    closeAllMenus: () => void;
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {activeMenuPath, setActiveMenuPath, activeDelayer} = React.useContext(AppMenuContext);
    const currentPath = [...parentPath, menu.key];
    const menuButton = React.useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (activeDelayer.current) {
            clearTimeout(activeDelayer.current);
            activeDelayer.current = null;
        }
        if (menu.subMenuList) {
            if (activeMenuPath.join("/") === currentPath.join("/")) {
                return;
            } else {
                setAnchorEl(menuButton.current);
                setActiveMenuPath(currentPath);
            }
        } else if (menu.path) {
            navigate(menu.path);
            closeAllMenus();
        }
    };
    const handleMouseEnter = () => {
        if (activeDelayer.current) {
            clearTimeout(activeDelayer.current);
        }
        activeDelayer.current = setTimeout(() => {
            if (activeMenuPath.join("/") === currentPath.join("/")) {
                return;
            } else if (menu.subMenuList) {
                setAnchorEl(menuButton.current);
                setActiveMenuPath(currentPath);
            } else {
                setAnchorEl(null);
                setActiveMenuPath(parentPath);
            }
        }, 200);
    }

    const isOpen
        = activeMenuPath.join("/").startsWith(currentPath.join("/")) && activeMenuPath.length >= currentPath.length;

    return (
        <Box>
            <Button
                id={menu.key + "_button"}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                ref={menuButton}
                color={"secondary"}
            >
                {menu.label + (menu.subMenuList && " ▶" || "")}
            </Button>

            {menu.subMenuList && isOpen && (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    placement="right-start"
                    sx={{zIndex: 9999}}
                >
                    {menu.subMenuList.map(subMenu => (
                        <NestedMenu
                            key={subMenu.key}
                            menu={subMenu}
                            closeAllMenus={closeAllMenus}
                            parentPath={currentPath}
                        />
                    ))}
                </Popper>
            )}
        </Box>
    );
};


export {NestedMenu};