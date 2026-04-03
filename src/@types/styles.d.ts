import type {Palette as MuiPalette, PaletteOptions as MuiPaletteOptions} from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette extends MuiPalette {
        on: MuiPalette["primary"];
        off: MuiPalette["primary"];
    }

    interface PaletteOptions extends MuiPaletteOptions {
        on?: MuiPaletteOptions["primary"];
        off?: MuiPaletteOptions["primary"];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        on: true;
        off: true;
    }
}