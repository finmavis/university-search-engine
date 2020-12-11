import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';

import { LOCAL_STORAGE_KEY } from 'shared/constants/local-storage.constant';

export interface UniversityType {
  alpha_two_code: string;
  country: string;
  'state-province'?: string;
  domains: string[];
  name: string;
  web_pages: string[];
}

enum ACTION_TYPES {
  ADD = 'ADD',
  DELETE = 'DELETE',
  CLEAR_ALL = 'CLEAR_ALL',
}

interface FavouriteState {
  [key: string]: UniversityType;
}

type Action =
  | { type: ACTION_TYPES.ADD; payload: UniversityType }
  | { type: ACTION_TYPES.DELETE; payload: UniversityType }
  | { type: ACTION_TYPES.CLEAR_ALL };

interface FavouriteContextType {
  state: FavouriteState;
  dispatch: Dispatch<Action>;
}

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined
);

function reducer(state: FavouriteState, action: Action) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const key = `${action.payload.name}-${action.payload.alpha_two_code}`;
      return {
        ...state,
        [key]: action.payload,
      };
    }
    case ACTION_TYPES.DELETE: {
      const key = `${action.payload.name}-${action.payload.alpha_two_code}`;
      const updatedState = { ...state };
      delete updatedState[key];
      return updatedState;
    }
    case ACTION_TYPES.CLEAR_ALL: {
      return {};
    }
    default: {
      return state;
    }
  }
}

interface FavouriteProviderProps {
  children: ReactNode;
}

export function FavouriteProvider({
  children,
}: FavouriteProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {}, (initialState) => {
    try {
      const favourites = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.FAVOURITES) || '{}'
      );
      return favourites;
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.FAVOURITES,
      JSON.stringify(state)
    );
  }, [state]);

  return (
    <FavouriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavouriteContext.Provider>
  );
}

interface useFavouriteType {
  favourites: FavouriteState;
  add: (payload: UniversityType) => void;
  remove: (payload: UniversityType) => void;
  has: (key: string) => boolean;
  size: number;
  clearAll: () => void;
}

export function useFavourite(): useFavouriteType {
  const context = useContext<FavouriteContextType | undefined>(
    FavouriteContext
  );
  if (!context) {
    throw new Error(`useFavourite must be used within a FavouriteProvider`);
  }
  const { state, dispatch } = context;

  return {
    favourites: state,
    add: (payload: UniversityType) =>
      dispatch({ type: ACTION_TYPES.ADD, payload }),
    remove: (payload: UniversityType) =>
      dispatch({ type: ACTION_TYPES.DELETE, payload }),
    has: (key: string) => key in state,
    size: Object.keys(state).length,
    clearAll: () => dispatch({ type: ACTION_TYPES.CLEAR_ALL }),
  };
}
