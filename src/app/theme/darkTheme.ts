import { createTheme, ThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";

// Extiende la interfaz de PaletteOptions para incluir tus colores personalizados
interface CustomPaletteOptions extends PaletteOptions {
    customTertiary?: {
        main: string;
    };
    customQuaternary?: {
        main: string;
    };
}

// Extiende la interfaz de ThemeOptions para incluir tus opciones de paleta personalizadas
interface CustomThemeOptions extends ThemeOptions {
    palette: CustomPaletteOptions;
}

// Crea tu tema personalizado utilizando la interfaz extendida
export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#150050'
        },
        tertiary: {
            main: '#3F0071'

        },
        quaternary: {
            main: '#FB2576'
        },
        error: {
            main: red.A400
        }
    }
} as CustomThemeOptions); // Asegúrate de hacer el casting a CustomThemeOptions