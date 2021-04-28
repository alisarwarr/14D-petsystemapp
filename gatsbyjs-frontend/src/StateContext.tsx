import React, { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './contextapi';

const StateContext = createContext<any[]>([]);

interface StateProviderProps {
    children: JSX.Element | JSX.Element[];
}

export function StateProvider({ children }: StateProviderProps) {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider
            value={[ state, dispatch ]}            //"useReducer" values send as an object
        >
            { children }
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext<any[]>(StateContext);