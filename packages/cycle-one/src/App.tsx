import { CycleNeutralTemplate } from "./components/templates/cycle-neutral";
import { DarkModeProvider } from "./context/dark-mode";
import { RoutersProvider } from "./routes";

function App() {
  return (
    <DarkModeProvider>
      <CycleNeutralTemplate>
        <RoutersProvider />
      </CycleNeutralTemplate>
    </DarkModeProvider>
  );
}

export default App;
