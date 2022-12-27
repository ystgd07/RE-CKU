import { configureStore } from '@reduxjs/toolkit';
import FormSlice from './formSlice';

const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
