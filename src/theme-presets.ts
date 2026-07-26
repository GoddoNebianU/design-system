import presetData from "./themes.json";

export interface ThemePreset {
  id: string;
  name: string;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = presetData;

export const DEFAULT_THEME = "mist";

export function getThemePreset(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find((preset) => preset.id === id);
}
