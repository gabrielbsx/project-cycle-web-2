import { createContext, useReducer } from "react";

export enum ActionDarkMode {
  TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE",
}

interface State {
  darkMode: boolean;
}

interface Action {
  type: ActionDarkMode;
  payload?: boolean;
}

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true" ? true : false,
};

const darkModeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionDarkMode.TOGGLE_DARK_MODE:
      window.localStorage.setItem("darkMode", String(!state.darkMode));
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: initialState.darkMode,
  toggleDarkMode: () => null,
});

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [state, dispatch] = useReducer(darkModeReducer, initialState);
  const toggleDarkMode = () => {
    dispatch({
      type: ActionDarkMode.TOGGLE_DARK_MODE,
    });
  };
  return (
    <DarkModeContext.Provider
      value={{
        darkMode: state.darkMode,
        toggleDarkMode,
      }}
    >
      <div className={`${state.darkMode ? "dark" : ""}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};
