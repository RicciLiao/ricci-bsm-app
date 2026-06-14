import {Stack} from "@mui/material";
import MDEditor from '@uiw/react-md-editor';
import React from "react";
import {useSearchParams} from "react-router-dom";
import "../../EntryMDEditor.css"

const FileEntryEditorComp = () => {
    const [value, setValue] = React.useState<string>("**Hello world!!!**");

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    console.log(token);
    /*const [getFsp] = useLazyGetFspQuery();
    getFsp(encodeURIComponent(token))
        .unwrap()
        .then((fspResult) => {
            const binaryString = atob(fspResult.data.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const text = new TextDecoder('utf-8').decode(bytes);
            console.log(text);
        });*/

    return (
        <Stack sx={{padding: "10px", height: "calc(100% - 20px)", width: "calc(100% - 20px)"}}>
            <Stack>

            </Stack>
            <Stack sx={{height: "100%", width: "100%"}}>
                <MDEditor
                    value={value}
                    onChange={(value) => setValue(value ?? "")}
                    height="100%"
                />
            </Stack>
        </Stack>
    );
};

export {FileEntryEditorComp}