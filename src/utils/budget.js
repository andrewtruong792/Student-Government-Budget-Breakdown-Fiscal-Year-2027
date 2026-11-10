// budget.js
export const palette = ["#2D6B76", "#E76E50", "#FFCB52", "#CAA644", "#F4A462"];

export const sections = [
    { id: "about", label: "About" },
    { id: "overview", label: "Overview" },
    { id: "revenue", label: "Revenue" },
    { id: "expenses", label: "Expenses" },
    { id: "sg", label: "Student Government" },
    { id: "trends", label: "Trends" },
    { id: "events", label: "Events" },
];

export function money(value) {
    const sign = value < 0 ? "-" : "";
    const abs = Math.abs(value);
    if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${sign}$${Math.round(abs / 1e3)}K`;
    return `${sign}$${abs}`;
}

export function percent(part, whole) {
    return `${((part / whole) * 100).toFixed(1)}%`;
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
