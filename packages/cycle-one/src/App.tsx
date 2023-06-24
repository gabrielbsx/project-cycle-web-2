import { BrowserRouter } from "react-router-dom";
import { CycleNeutralTemplate } from "./components/templates/cycle-neutral";
import { DarkModeProvider } from "./context/dark-mode";
import { RoutersProvider } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/user-context";

function App() {
  return (
    <DarkModeProvider>
      <UserProvider>
        <ToastContainer />
        <BrowserRouter>
          <CycleNeutralTemplate>
            <RoutersProvider />
          </CycleNeutralTemplate>
        </BrowserRouter>
      </UserProvider>
    </DarkModeProvider>
  );
}

export default App;
