import {AppMenuItem} from "@interfaces/AppMenuItem.ts";
import {Box, Button, Popper} from "@mui/material";
import {NestedMenu} from "@/components/menu/NestedMenu.tsx";
import React from "react";
import {AppMenuContext} from "@/components/menu/AppMenu.tsx";

const HeaderMenu = ({menu}: { menu: AppMenuItem }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {activeMenuPath, setActiveMenuPath, activeDelayer, closeAllMenus} = React.useContext(AppMenuContext);
    const menuButton = React.useRef<HTMLButtonElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (menu.subMenuList) {
            if (activeMenuPath[0] === menu.key) {
                closeAllMenus();
            } else {
                setAnchorEl(event.currentTarget);
                setActiveMenuPath([menu.key]);
            }
        } else if (menu.path) {
            closeAllMenus();
        }
    };
    const handleMouseEnter = () => {
        if (activeMenuPath.length > 0) {
            activeDelayer.current = setTimeout(() => {
                if (activeMenuPath[0] === menu.key) {
                    return;
                } else {
                    if (activeDelayer.current) {
                        clearTimeout(activeDelayer.current);
                    }
                    setActiveMenuPath([menu.key]);
                    if (menu.subMenuList) {
                        setAnchorEl(menuButton.current);
                    } else {
                        setAnchorEl(null);
                    }
                }
            }, 200);
        }
    }

    const isOpen = activeMenuPath[0] === menu.key && Boolean(anchorEl);

    return (
        <Box>
            <Button
                id={menu.key + "_button"}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                ref={menuButton}
                color={"secondary"}
            >
                {menu.label}
            </Button>

            {menu.subMenuList && isOpen && (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={(theme) => ({zIndex: theme.zIndex.drawer + 1})}
                >
                    {menu.subMenuList.map(subMenu => (
                        <NestedMenu
                            key={subMenu.key}
                            menu={subMenu}
                            closeAllMenus={closeAllMenus}
                            parentPath={[menu.key]}
                        />
                    ))}
                </Popper>
            )}
        </Box>
    );
};


export {HeaderMenu};