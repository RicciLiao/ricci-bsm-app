import {useAppDispatch, useAppSelector} from "@app/hooks.ts";
import {bsmEntrySlice, useLazyGetEntryParentPathQuery, useListByParentEntryIdQuery} from "@app/slice/api/bsmEntrySlice.ts";
import {currentEntryPath, selectCurrentEntryPathId} from "@app/slice/bsmEntryPathSlice.tsx";
import {bsmConstants} from "@common/bsmConstants.ts";
import {AddButtonComp} from "@features/entry/AddButtonComp.tsx";
import {EntrySidebarComp} from "@features/entry/EntrySidebarComp.tsx";
import {BsmEntry} from "@interfaces/api/BsmEntry.ts";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {Box, IconButton, Stack} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppBreadcrumbs, AppBreadcrumbsProps} from "x-common-components-app";

interface EntryIndexContext {
    onEntryClick: (entry: BsmEntry) => void;
    entryList: BsmEntry[];
}

const homeBreadcrumbs: AppBreadcrumbsProps<number> = {arg: 0, href: "", label: "Home"};

const EntryIndexComp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(true);
    const [getEntryParentPath] = useLazyGetEntryParentPathQuery();
    const {data} = useListByParentEntryIdQuery(useAppSelector(selectCurrentEntryPathId));
    const [breadcrumbs, setBreadcrumbs] = useState<AppBreadcrumbsProps<number>[]>([homeBreadcrumbs]);

    const handleDirectoryClick = useCallback((id: number) => {
            Promise
                .all([
                    getEntryParentPath(id).unwrap(),
                    dispatch(bsmEntrySlice.endpoints.listByParentEntryId.initiate(id, {forceRefetch: true,})).unwrap()
                ])
                .then(([parentPathResult]) => {
                    const newBreadcrumbs = [homeBreadcrumbs];
                    parentPathResult.data.data.forEach(path => {
                        newBreadcrumbs.push({arg: path.entryId ?? 0, href: "", label: path.entryName});
                    });
                    setBreadcrumbs(newBreadcrumbs);
                    dispatch(currentEntryPath(id));
                    if (location.pathname.endsWith("file")) {
                        navigate("/index/entry/tree");
                    }
                });
        },
        [getEntryParentPath, dispatch, location.pathname, navigate]);
    const handleEntryClick = useCallback((entry: BsmEntry) => {
            if (entry.entryType === bsmConstants.ENTRY_TYPE_DIRECTORY) {
                handleDirectoryClick(entry.id ?? 0);
            } else if (entry.fsp) {
                navigate("/index/entry/file?token=" + encodeURIComponent(entry.fsp.fspToken));
            }
        },
        [navigate, handleDirectoryClick]);
    const contextData: EntryIndexContext = useMemo(() => ({
            onEntryClick: handleEntryClick, entryList: data?.data.data || []
        }),
        [handleEntryClick, data]);

    return (
        <Stack direction="row" sx={{height: "100%", width: "100%"}}>
            <EntrySidebarComp minWidth={300}
                              maxWidth={800}
                              open={open} onClose={() => setOpen(false)}
                              onOpen={() => setOpen(true)}
                              onEntryClick={handleEntryClick}
            />
            <Stack direction="column" alignItems="center" sx={{padding: "5px", width: "100%"}}>
                <Stack id={"header-container"} sx={{width: "100%"}} alignItems={"center"}>
                    <Stack id={"header-title"} direction="row" alignItems="center" justifyContent="space-between" sx={{width: "100%"}}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} sx={{}}>
                            <Box id={"header-entry-sidebar-toggle"} hidden={open}>
                                <IconButton sx={{transform: 'rotate(90deg)'}} onClick={() => setOpen(true)}>
                                    <FileUploadIcon sx={{fontSize: 24}}/>
                                </IconButton>
                            </Box>
                            <Stack id={"header-breadcrumbs"} direction="row" alignItems="center" justifyContent="flex-start">
                                <AppBreadcrumbs propsList={breadcrumbs} onItemClick={arg => handleDirectoryClick(arg)}/>
                                <IconButton> <CopyAllOutlinedIcon sx={{fontSize: 24}}/> </IconButton>
                            </Stack>
                        </Stack>
                        <Stack>
                            2
                        </Stack>
                    </Stack>
                    <Stack id={"header-button"} direction="row" alignItems="center" justifyContent="flex-end" sx={{width: "100%"}}>
                        <Stack id={"header-button-add"}>
                            <AddButtonComp/>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack id={"body-container"} sx={{paddingTop: "10px", width: "100%"}}>
                    {contextData && <Outlet context={contextData}/>}
                </Stack>
            </Stack>
        </Stack>
    );
}

export {
    EntryIndexComp,
    type EntryIndexContext,
};