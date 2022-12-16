import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
};

const slice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        change: (state, action) => {
            state.id = action.payload;
        },
    },
});

export default slice;
