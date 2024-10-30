import {DirtyCheckFormInterface,} from "./DirtyCheckFormInterface.ts";
import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, Typography} from "@mui/material";


interface DirtyCheckFields {
    bCheck: boolean,
}

interface DirtyCheckFromFields extends HTMLFormControlsCollection {
    bCheckBox: HTMLInputElement,
}

interface DirtyCheckFromElement extends HTMLFormElement {
    readonly elements: DirtyCheckFromFields
}

export const DirtyCheckFromB: DirtyCheckFormInterface = {
    render: () => {
        const [checkB, setCheckB] = useState<boolean>(false);
        const dirtyCheck = (fields: DirtyCheckFields) => {

            return fields.bCheck;
        }
        const handleSubmit = (e: React.FormEvent<DirtyCheckFromElement>) => {
            if (e) {
                e.preventDefault();
            }
            const result = dirtyCheck({bCheck: checkB});
            if (!result) {
                alert("Dirty Check From B Failed.");
            } else {
                alert("Dirty Check From B Succeed.");
            }

            return result;
        }

        return (
            <Box component={"form"} onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '20px',
                alignItems: 'center',
                border: '2px dashed black',
            }}>
                <Typography>I`m Dirty Check From B</Typography>
                <FormControlLabel control={<Checkbox name={"bCheckBox"} id={"bCheckBox"} checked={checkB}
                                                     onChange={() => setCheckB(!checkB)}/>}
                                  label={"Skip Dirty CheckB."}/>
                <Button size={"small"} type={"submit"}>FromB Save</Button>
            </Box>
        );
    },
    index: 1,
    description: "Dirty Check From B",
}

