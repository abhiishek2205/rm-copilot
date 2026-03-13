import { createContext, useContext, useReducer } from "react";
import clients from "../data/clients.json";

const ClientContext = createContext(null);

const initialState = {
  clients,
  selectedClient: clients[0],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_CLIENT":
      return {
        ...state,
        selectedClient: state.clients.find((c) => c.id === action.payload),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ClientContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  const { state, dispatch } = context;
  return {
    clients: state.clients,
    selectedClient: state.selectedClient,
    setSelectedClient: (id) =>
      dispatch({ type: "SET_SELECTED_CLIENT", payload: id }),
  };
}