// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { toggleDarkMode } from "../theme/theme";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    setTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        return (localStorage.getItem("app-theme") as ThemeMode) || "system";
    });

    useEffect(() => {
        const applyTheme = () => {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const html = document.body;

            html.classList.remove("dark-mode");
            toggleDarkMode(false);

            if (theme === "system") {
                if (prefersDark) {
                    html.classList.add("dark-mode");
                    toggleDarkMode(true);
                }
                else {
                    html.classList.remove("dark-mode")
                    toggleDarkMode(false);
                }
            } else {
                if (theme == "dark") {
                    html.classList.add("dark-mode");
                    toggleDarkMode(true);
                }
                else {
                    html.classList.remove("dark-mode")
                    toggleDarkMode(false);
                }
            }
        };

        applyTheme();

        if (theme === "system") {
            const listener = (e: MediaQueryListEvent) => applyTheme();
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }
    }, [theme]);

    const setTheme = (newTheme: ThemeMode) => {
        localStorage.setItem("app-theme", newTheme);
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
