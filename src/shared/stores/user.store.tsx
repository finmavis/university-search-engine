import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

enum ACTION_TYPES {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
interface UserState {
  user: User | null;
  existing: string;
}
type Action =
  | { type: ACTION_TYPES.REGISTER; payload: User }
  | { type: ACTION_TYPES.LOGIN; payload: User }
  | { type: ACTION_TYPES.LOGOUT };

interface UserContextType {
  state: UserState;
  dispatch: Dispatch<Action>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function generateUniqueId() {
  return Math.floor(Math.random() * (Math.random() * Date.now()));
}

function encode(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decoded(value: string) {
  return decodeURIComponent(escape(atob(value)));
}

function reducer(state: UserState, action: Action) {
  switch (action.type) {
    case ACTION_TYPES.REGISTER: {
      const existing: UserState[] = JSON.parse(decoded(state.existing));
      return {
        ...state,
        user: action.payload,
        existing: encode(JSON.stringify([...existing, action.payload])),
      };
    }
    case ACTION_TYPES.LOGIN: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [cookies, setCookie] = useCookies(['userCookie']);
  const [state, dispatch] = useReducer(
    reducer,
    {},
    (): UserState => {
      const user = cookies.user
        ? (JSON.parse(decoded(cookies.user)) as User)
        : null;
      const users = cookies.existing || encode(JSON.stringify([]));
      return {
        user: user,
        existing: users,
      };
    }
  );

  useEffect(() => {
    setCookie('user', encode(JSON.stringify(state.user)));
    setCookie('existing', state.existing);
  }, [state.existing, state.user, setCookie]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

interface useUserType {
  user: User | null;
  register: (payload: {
    name: string;
    password: string;
    email: string;
  }) => void;
  isExists: (email: string) => boolean;
  logout: () => void;
  login: (payload: { email: string; password: string }) => void;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function useUser(): useUserType {
  const context = useContext<UserContextType | undefined>(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  const history = useHistory();
  const { state, dispatch } = context;

  function isExists(email: string): boolean {
    const { existing } = state;
    const users = JSON.parse(decoded(existing)) as User[];
    const index = users.findIndex((user) => user.email === email);
    return index !== -1;
  }

  function register(payload: RegisterPayload) {
    dispatch({
      type: ACTION_TYPES.REGISTER,
      payload: { ...payload, id: generateUniqueId() },
    });
  }

  function login(payload: { email: string; password: string }) {
    if (!isExists(payload.email)) {
      throw new Error(`NO_EXISTS`);
    }
    const { existing } = state;
    const users = JSON.parse(decoded(existing)) as User[];
    const user = users.find(
      (user) =>
        user.email === payload.email && user.password === payload.password
    );
    if (!user) {
      throw new Error(`INCORRECT`);
    }
    dispatch({ type: ACTION_TYPES.LOGIN, payload: user });
  }

  function logout() {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    history.push('/');
  }

  return {
    user: state.user,
    register: register,
    isExists: isExists,
    logout: logout,
    login: login,
  };
}
