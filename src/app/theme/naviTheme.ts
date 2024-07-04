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
export const naviTheme = createTheme({
  palette: {
    primary: {
      main: '#1A374D'
    },
    secondary: {
      main: '#406882'
    },
    // Utiliza los colores personalizados
    customTertiary: {
      main: '#6998AB'
    },
    customQuaternary: {
      main: '#B1D0E0'
    },
    error: {
      main: red.A400
    }
  }
} as CustomThemeOptions); // Asegúrate de hacer el casting a CustomThemeOptions