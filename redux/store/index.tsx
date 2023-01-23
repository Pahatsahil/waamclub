import React, {createContext, useReducer, useContext} from 'react';
import {initialState, reducer} from '../reducers';
import {useActions} from '../actions';

const StoreContext = createContext(initialState);
let singleDispatch: any = null;

const StoreProvider = ({children}: any) => {
  // Get state and dispatch from Reacts new API useReducer.
  const [state, dispatch] = useReducer(reducer, initialState);
  // Get actions from useActions and pass it to Context
  const actions = useActions(state, dispatch);
  // singleDispatch = actions;

  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider value={{state, dispatch, actions}}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export {StoreContext, StoreProvider, useStore};
