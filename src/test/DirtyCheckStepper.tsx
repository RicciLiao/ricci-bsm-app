import {Box, Button, Card, Step, StepLabel, Stepper} from "@mui/material";
import React, {useRef, useState} from "react";
import {DirtyCheckFormInterface} from "./DirtyCheckFormInterface.ts";
import {DirtyCheckFromA} from "./DirtyCheckFromA.tsx";
import {DirtyCheckFromB} from "./DirtyCheckFromB.tsx";

export const DirtyCheckStepper = () => {
    const fromList = [DirtyCheckFromA, DirtyCheckFromB] as DirtyCheckFormInterface[];
    const [activeForm, setActiveForm] = useState<DirtyCheckFormInterface>(fromList[0]);
    const trigger = useRef<HTMLButtonElement>(null);
    const form = activeForm.render(React.cloneElement(activeForm.trigger, {ref: trigger}));

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            maxWidth: '450px',
            height: '100%',
            padding: '20px',
            boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        }} variant="outlined">
            <h2>Dirty Check</h2>
            <Stepper activeStep={activeForm.index} alternativeLabel>
                {fromList.map(form => {

                    return (
                        <Step key={form.index + 'a'}>
                            <StepLabel>
                                {form.description}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {form}
            <Box>
                <Button sx={{mt: '10px'}} size={"large"} onClick={() => {
                    const result = trigger.current?.focus();
                    if (result) {
                        setActiveForm(fromList[fromList.findIndex(f => f === activeForm) + 1])
                    }
                }}> Step Next </Button>
            </Box>
        </Card>
    );
}