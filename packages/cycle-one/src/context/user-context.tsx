// context api reducer to handle user data
import { createContext, useReducer } from "react";
import { User } from "../schema/user";

export enum ActionUser {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

interface State {
  user: User | null;
}

interface Action {
  type: ActionUser;
  payload?: User;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  user: localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user") as string) as User)
    : null,
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionUser.SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
      };
    case ActionUser.LOGOUT_USER:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const UserContext = createContext<UserContextProps>({
  user: initialState.user,
  setUser: () => null,
  logoutUser: () => null,
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const setUser = (user: User) => {
    dispatch({
      type: ActionUser.SET_USER,
      payload: user,
    });
  };
  const logoutUser = () => {
    dispatch({
      type: ActionUser.LOGOUT_USER,
    });
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
