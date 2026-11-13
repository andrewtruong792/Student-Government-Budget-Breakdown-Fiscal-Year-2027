// budget.js
import colors from "../data/colors.json";

export { colors };
export const palette = colors.graphs;

export function colorAt(i) {
    return palette[i % palette.length];
}

export function previousYear(year) {
    return String(Number(year) - 1);
}

export function fiscalYear(year) {
    return `${previousYear(year)}-${String(year).slice(2)}`;
}

export function fy(year) {
    return `FY${String(year).slice(2)}`;
}

export function money(value) {
    const sign = value < 0 ? "-" : "";
    const abs = Math.abs(value);
    if (abs >= 999.95e6) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
    if (abs >= 999.5e3) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
    if (abs >= 999.5) return `${sign}$${Math.round(abs / 1e3)}K`;
    return `${sign}$${Math.round(abs)}`;
}

export function formatPercent(n) {
    return `${n.toFixed(1)}%`;
}

export function percent(part, whole) {
    return formatPercent((part / whole) * 100);
}

export function percentChange(from, to) {
    return ((to - from) / from) * 100;
}

export function signedPercent(n) {
    if (n === null) return "—";
    return `${n >= 0 ? "+" : ""}${formatPercent(n)}`;
}

export function sum(rows) {
    return rows.reduce((total, row) => total + row.value, 0);
}

export function revenueSources(budget) {
    const [tuition, discounts, ...rest] = budget.operating_revenues.rows;
    const operating = [{ label: "Net Tuition and Fees", value: tuition.value + discounts.value }, ...rest]
        .map((row) => ({ ...row, type: "operating" }));
    const nonOperating = budget.budgeted_nonoperating_revenues.rows
        .map((row) => ({ ...row, type: "non-operating" }));

    return [...operating, ...nonOperating]
        .filter((row) => row.value > 0)
        .sort((a, b) => b.value - a.value);
}

export function totalRevenue(budget) {
    return sum(revenueSources(budget));
}

export function expenseRows(budget) {
    return budget.operating_expenses.rows
        .filter((row) => row.value > 0)
        .sort((a, b) => b.value - a.value);
}
