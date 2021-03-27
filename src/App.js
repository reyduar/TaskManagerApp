import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NotificationProvider } from "./contexts";
import AppRouter from "./router/AppRouter";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#4791db",
        main: "#1976d2",
        dark: "#115293",
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
