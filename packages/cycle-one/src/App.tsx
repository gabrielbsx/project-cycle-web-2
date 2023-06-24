import { BrowserRouter } from "react-router-dom";
import { CycleNeutralTemplate } from "./components/templates/cycle-neutral";
import { DarkModeProvider } from "./context/dark-mode";
import { RoutersProvider } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <DarkModeProvider>
      <ToastContainer />
      <BrowserRouter>
        <CycleNeutralTemplate>
          <RoutersProvider />
        </CycleNeutralTemplate>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
