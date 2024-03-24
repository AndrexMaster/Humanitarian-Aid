import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние счетчика
const initialState = {
    userId: null,
    userToken: null,
    user: {},
};

// Создание среза счетчика
const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        userLogout: (state) => {
            state.userId = null;
            state.userToken = null;
            state.user = {};
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
        }
    },
});

// Экспорт редуктора и созданных редукторов
export const {
    setUserId,
    setUser,
    setUserToken,
    userLogout,
} = authSlice.actions;
export default authSlice.reducer;
