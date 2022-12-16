import React, { useReducer, createContext, useContext } from 'react';

// const initialGlobal = {

// };

type State = {
    value: string;
};

function reducer(state: string, action: string) {
    console.log(state, '123', action);
}
