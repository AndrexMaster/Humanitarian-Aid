import { configureStore } from '@reduxjs/toolkit';
import themeSlice from "./Global/themeSlice";
import authSlice from "./Auth/authSlice";

const store = configureStore({
    reducer: {
        theme: themeSlice,
        user: authSlice,
    },
});

export default store;
