// YearContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const files = import.meta.glob("../data/[0-9][0-9][0-9][0-9].json", { eager: true, import: "default" });

const budgets = {};
for (const [path, file] of Object.entries(files)) {
    const year = path.match(/(\d{4})\.json$/)[1];
    budgets[year] = file.data;
}

export const years = Object.keys(budgets).sort().reverse();

const STORAGE_KEY = "selectedYear";

function getSavedYear() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && budgets[saved]) return saved;
    } catch {}
    return years[0];
}

const YearContext = createContext(null);

export function YearProvider({ children }) {
    const [year, setYear] = useState(getSavedYear);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, year);
        } catch {}
    }, [year]);

    return (
        <YearContext.Provider value={{ year, setYear, years, budget: budgets[year] }}>
            {children}
        </YearContext.Provider>
    );
}

export function useYear() {
    return useContext(YearContext);
}
