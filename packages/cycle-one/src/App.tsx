import { CycleNeutralTemplate } from "./components/templates/cycle-neutral";
import { RoutersProvider } from "./routes";

function App() {
  return (
    <CycleNeutralTemplate>
      <RoutersProvider />
    </CycleNeutralTemplate>
  );
}

export default App;
