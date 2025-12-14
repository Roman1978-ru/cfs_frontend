import { createSlice } from "@reduxjs/toolkit";

function updateDocumentTheme(isDark: boolean) {
    if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        return;
    }

    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
}

export const themeStore = createSlice({
    name: "theme",
    initialState: {
        isDark: (() => {
            const storedTheme = localStorage.getItem("CFR_USER_THEME");
            const isDark = storedTheme ? storedTheme === "dark" : false;
            updateDocumentTheme(isDark);
            return isDark;
        })(),
    },
    reducers: {
        toggleTheme(state) {
            state.isDark = !state.isDark;
            if (state.isDark) {
                localStorage.setItem("CFR_USER_THEME", "dark");
                updateDocumentTheme(true);
            } else {
                localStorage.setItem("CFR_USER_THEME", "light");
                updateDocumentTheme(false);
            }
        }
    },
    selectors: {
        isDark: (state) => state.isDark,
    }
});
