import { useState } from "react";
import { Router } from "./router";
import { GlobalStyle } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { TeamContext } from "./context/TeamContext";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  const [teamNameExists, setTeamNameExists] = useState(false);
  return (
    <ThemeProvider theme={defaultTheme}>
      <TeamContext.Provider value={{ teamNameExists, setTeamNameExists }}>
      <GlobalStyle />

      <Router />
      </TeamContext.Provider>
    </ThemeProvider>
  )
}