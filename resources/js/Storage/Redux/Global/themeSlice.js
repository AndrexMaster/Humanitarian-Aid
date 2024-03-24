import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние счетчика
const initialState = {
    theme: 'light',
};

// Создание среза счетчика
const themeSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    },
});

// Экспорт редуктора и созданных редукторов
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
