import { createContext, useReducer } from "react";
import { CoffeeStore } from "../lib/coffee-stores";

interface STORE_STATE {
  latLong: string;
  coffeeStores: CoffeeStore[];
}

export const ISTORE_STATE: STORE_STATE = {
  latLong: '',
  coffeeStores: [],
};

export const STORE_ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

export type STORE_ACTION =
  | { type: 'SET_LAT_LONG'; payload: string }
  | { type: 'SET_COFFEE_STORES'; payload: CoffeeStore[] };

const storeReducer = (state: STORE_STATE, action: STORE_ACTION) => {
  switch (action.type) {
    case 'SET_LAT_LONG':
      return {
        ...state,
        latLong: action.payload,
      };
    case 'SET_COFFEE_STORES':
      return {
        ...state,
        coffeeStores: action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, ISTORE_STATE);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;