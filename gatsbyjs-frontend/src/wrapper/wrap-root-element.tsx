import React from 'react';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports.js';
//CONTEXT-API
import { StateProvider } from '../StateContext';

export const wrapRootElement = ({ element }) => {
    Amplify.configure(awsmobile);

    return <StateProvider>{element}</StateProvider>
}