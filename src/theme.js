import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#2e7d32" },
    background: {
      default: "#ffffffff",
      paper: "#ffffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

export default theme;
