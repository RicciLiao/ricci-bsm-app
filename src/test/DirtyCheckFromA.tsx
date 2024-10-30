import {DirtyCheckFormInterface,} from "./DirtyCheckFormInterface.ts";
import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, styled, TextField, Typography} from "@mui/material";

interface DirtyCheckFields {
    aCheck: boolean,
}

interface DirtyCheckFromFields extends HTMLFormControlsCollection {
    aCheckBox: HTMLInputElement,
}

interface DirtyCheckFromElements extends HTMLFormElement {
    readonly elements: DirtyCheckFromFields
}

export const DirtyCheckFromA: DirtyCheckFormInterface = {
    render: (arg0: React.ReactElement) => {
        const [checkA, setCheckA] = useState<boolean>(false);

        const dirtyCheck = (fields: DirtyCheckFields) => {

            return fields.aCheck;
        }

        const handleSubmit = (e: React.FormEvent<DirtyCheckFromElements>) => {
            e.preventDefault();
            const result = dirtyCheck({aCheck: checkA});
            if (!result) {
                alert("Dirty Check From A Failed.");
            } else {
                alert("Dirty Check From A Succeed.");
            }

            return result;
        }

        const FormBox = styled('form')(() => ({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: '20px',
        }));

        return (
            <FormBox onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '20px',
                alignItems: 'center',
                border: '2px dashed black',
            }}>
                <Typography>I`m Dirty Check From A</Typography>
                <FormControlLabel control={<Checkbox name={"aCheckBox"} id={"aCheckBox"} checked={checkA}
                                                     onChange={() => setCheckA(!checkA)}/>}
                                  label={"Skip Dirty CheckA."}/>
                {arg0}
            </FormBox>
        );
    },
    index: 0,
    description: "Dirty Check From A",
    trigger: <TextField></TextField>,

}

