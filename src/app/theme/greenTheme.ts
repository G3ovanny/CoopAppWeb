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

export const greenTheme = createTheme({
    palette: {
      primary: {
        main: '#006628'
      },
      secondary: {
        main: '#00953B'
      },
      // Utiliza los colores personalizados
      customTertiary: {
        main: '#FFD700'
      },
      customQuaternary: {
        main: '#ffff81'
      },
      error: {
        main: red.A400
      }
    }
  } as CustomThemeOptions); // Asegúrate de hacer el casting a CustomThemeOptions