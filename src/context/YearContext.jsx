// YearContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import budgets from "../data/budget-all.json";

export const years = Object.keys(budgets)
    .filter((y) => budgets[y].operating_budget)
    .sort()
    .reverse();

export function getBudget(year) {
    const { operating_budget, annual_financial_report } = budgets[year];
    return { ...operating_budget, afr: annual_financial_report };
}

const STORAGE_KEY = "selectedYear";

function getSavedYear() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (years.includes(saved)) return saved;
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
        <YearContext.Provider value={{ year, setYear, years, budget: getBudget(year) }}>
            {children}
        </YearContext.Provider>
    );
}

export function useYear() {
    return useContext(YearContext);
}
