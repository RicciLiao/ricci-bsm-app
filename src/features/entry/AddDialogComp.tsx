import {useAppSelector} from "@app/hooks.ts";
import {useCreateEntryMutation} from "@app/slice/api/bsmEntrySlice.ts";
import {selectCurrentEntryPathId} from "@app/slice/bsmEntryPathSlice.tsx";
import {bsmConstants} from "@common/bsmConstants.ts";
import {BsmEntry, BsmEntryPath} from "@interfaces/api/BsmEntry.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React from "react";

interface AddDialogProps {
    open: boolean;
    onClose?: () => void;
    addType: number;
}

interface AddDialogFormFields extends HTMLFormControlsCollection {
    name: HTMLInputElement,
}

interface AddDialogFormElements extends HTMLFormElement {
    readonly elements: AddDialogFormFields
}

const AddDialogComp = (props: AddDialogProps) => {
    const [createEntry, {isLoading}] = useCreateEntryMutation();
    const currentEntryPathId = useAppSelector(selectCurrentEntryPathId);

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleSubmit = (event: React.SubmitEvent<AddDialogFormElements>) => {
        event.preventDefault();

        const entryPath: BsmEntryPath = {
            createdBy: 0,
            entryId: 0,
            entryName: event.currentTarget.elements.name.value,
            updatedBy: 0,
            parentEntryId: currentEntryPathId
        };
        const request: BsmEntry = {
            createdBy: 0,
            entryType: props.addType,
            path: entryPath,
            statusId: bsmConstants.STATUS_ACTIVE,
            updatedBy: 0,
        };
        createEntry(request)
            .unwrap()
            .then(() => {
                handleClose();
            });
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add {bsmConstants.ENTRY_TYPE_DIRECTORY === props.addType ? "Directory" : "File"}</DialogTitle>
            <DialogContent sx={{width: "500px"}}>
                <DialogContentText>
                </DialogContentText>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button loading={isLoading} type="submit" form="subscription-form">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export {AddDialogComp};
