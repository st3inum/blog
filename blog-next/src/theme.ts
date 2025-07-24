import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffa86a", // accent color from old blog
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Fira Code",
      "Monaco",
      "Consolas",
      "Ubuntu Mono",
      "monospace",
    ].join(","),
  },
});

export default theme;
