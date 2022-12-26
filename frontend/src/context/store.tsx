import { configureStore } from '@reduxjs/toolkit';
import formSlice from './FormSlice';

const store = configureStore({
    reducer: {
        form: formSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
