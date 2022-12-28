import { configureStore } from '@reduxjs/toolkit';
import FormSlice from './FormSlice';

const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
