"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({
    theme: DEFAULT_THEME,
    setTheme: () => {},
});

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        const initialTheme =
            storedTheme === "light" || storedTheme === "dark"
                ? storedTheme
                : DEFAULT_THEME;
        setThemeState(initialTheme);
        applyTheme(initialTheme);
    }, []);

    useEffect(() => {
        applyTheme(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignore storage errors
        }
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        if (nextTheme === "light" || nextTheme === "dark") {
            setThemeState(nextTheme);
        }
    };

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
