import { BrowserRouter } from "react-router-dom";
import { CycleNeutralTemplate } from "./components/templates/cycle-neutral";
import { DarkModeProvider } from "./context/dark-mode";
import { RoutersProvider } from "./routes";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <CycleNeutralTemplate>
          <RoutersProvider />
        </CycleNeutralTemplate>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
