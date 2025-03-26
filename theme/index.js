import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme, // Start with the default theme
  colors: {
    ...DefaultTheme.colors, // Use existing default colors as a base
    primary: "#05595B",
    accent: "#E2D784",
    background: "#f6f6f6",
    surface: "#ffffff",
    text: "#000000",
    disabled: "#c7c7c7",
    placeholder: "#6c6c6c",
    error: "#B00020",
  },
};
