import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState, // ✅ corrected here
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
