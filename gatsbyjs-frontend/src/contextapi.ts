//initialState
export const initialState: {
    dark: boolean;
} = {
    dark: true
}


//actionTypes
const SET_DARK: string = "SET_DARK";


//actions
export const settingDARK = () => {
    return {
        type: SET_DARK
    }
}


//reducer
export function reducer(state = initialState, action: any) {
    switch(action.type) {
        case SET_DARK:
            return {
                ...state,
                dark: !state.dark
            }

        default:
            return state;
    }
}