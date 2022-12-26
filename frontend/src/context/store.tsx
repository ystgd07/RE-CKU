import { configureStore } from '@reduxjs/toolkit';
import formSlice from './FormSlice';

export const store = configureStore({
    reducer: {
        form: formSlice.reducer,
    },
});
