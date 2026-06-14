import {useAppDispatch} from "@app/hooks.ts";
import {bsmEntrySlice, useListByParentEntryIdQuery} from "@app/slice/api/bsmEntrySlice.ts";
import {bsmConstants} from "@common/bsmConstants.ts";
import {EntrySidebarExplorerComp, ExtendedTreeItemProps} from "@features/entry/EntrySidebarExplorerComp.tsx";
import {BsmEntry} from "@interfaces/api/BsmEntry.ts";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {IconButton, Stack, Typography} from "@mui/material";
import {TreeViewBaseItem} from "@mui/x-tree-view/models";
import {entrySidebarTheme} from "@theme/entrySidebarTheme.ts";
import {produce} from "immer";
import React from "react";
import {AppSidebar, AppSidebarProps, AppThemeProvider} from "x-common-components-app";

interface EntrySideCompProps extends AppSidebarProps {
    onClose?: () => void;
    onOpen?: () => void;
    open: boolean;
    onEntryClick: (entry: BsmEntry) => void;
}

const findParent = (entry: BsmEntry, items: TreeViewBaseItem<ExtendedTreeItemProps>[]) => {
    let parentNode = items.find(item => item.entry?.id === entry.parentPathList[0].entryId);
    for (let i = 1; i < entry.parentPathList.length - 1; i++) {
        const entryPath = entry.parentPathList[i];
        if (parentNode?.children) {
            parentNode = parentNode.children.find(item => item.entry?.id === entryPath.entryId);
        }
    }

    return parentNode;
}

const addChild = (entry: BsmEntry, items: TreeViewBaseItem<ExtendedTreeItemProps>[]) => {
    const parentNode = findParent(entry, items);
    if (parentNode) {
        const child = {
            id: entry.id?.toString() ?? "",
            entry: entry,
            label: entry.path.entryName,
            children: entry.entryType === bsmConstants.ENTRY_TYPE_DIRECTORY ? [{id: (entry.id?.toString() ?? "") + "-0", label: "loading"}] : [],
        };
        let children = parentNode.children?.filter(item => !item.id.endsWith("-0")) ?? [];
        if (children) {
            if (children.findIndex(item => item.id === child.id) === -1) {
                children.push(child);
            }
        } else {
            children = [child];
        }
        parentNode.children = children;
    }
}

const handleEntryNode = (children: BsmEntry[], draft: TreeViewBaseItem<ExtendedTreeItemProps>[], parent: BsmEntry) => {
    if (children && children.length > 0) {
        children.forEach(entryItem => {
            addChild(entryItem, draft);
        });
    } else {
        const parentNode = findParent(parent, draft);
        if (parentNode) {
            const currentNode =
                parentNode.children?.find(item => item.id === parent.id?.toString());
            if (currentNode) {
                currentNode.children = [];
            } else {
                parentNode.children = [];
            }
        }
    }
}

const EntrySidebarComp = (props: EntrySideCompProps) => {
    const dispatch = useAppDispatch();
    const [explorerItems, setExplorerItems] = React.useState<TreeViewBaseItem<ExtendedTreeItemProps>[]>([]);
    const {data} = useListByParentEntryIdQuery(0);
    const entries = data?.data.data;

    const onEntryClick = React.useCallback((entry: BsmEntry) => {
        props.onEntryClick(entry);
        dispatch(bsmEntrySlice.endpoints.listByParentEntryId.initiate(Number(entry.id ?? 0)))
            .unwrap()
            .then(response => {
                setExplorerItems(produce(draft => {
                    handleEntryNode(response.data.data, draft, entry);
                }));
            });
    }, [dispatch, props]);

    if (explorerItems.length === 0 && entries) {
        setExplorerItems(entries.map(entry => ({
            id: entry.id?.toString() ?? "",
            entry: entry,
            label: entry.path.entryName,
            children: entry.entryType === bsmConstants.ENTRY_TYPE_DIRECTORY ? [{id: (entry.id?.toString() ?? "") + "-0", label: "loading"}] : [],
        })));
    }

    return (
        props.open &&
        <AppThemeProvider theme={entrySidebarTheme}>
            <AppSidebar props={props}>
                <Stack sx={{height: "100%", paddingLeft: "2px", paddingRight: "2px"}}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{}}>
                        <IconButton sx={{transform: "rotate(270deg)"}} onClick={() => props.onClose?.()}>
                            <FileUploadIcon sx={{fontSize: 24}}/>
                        </IconButton>
                        <Typography variant="h6">Files</Typography>
                    </Stack>
                    <Stack sx={{height: "100%", overflow: "auto"}}>
                        {explorerItems.length > 0 && <EntrySidebarExplorerComp items={explorerItems} onEntryClick={onEntryClick}/>}
                    </Stack>
                </Stack>
            </AppSidebar>
        </AppThemeProvider>
    );
}

export {EntrySidebarComp}