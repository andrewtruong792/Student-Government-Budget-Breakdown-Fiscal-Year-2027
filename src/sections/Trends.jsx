// Trends.jsx
import "./Trends.css";
import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Section from "../components/Section";
import { useYear } from "../context/YearContext";
import { colors, money, totalRevenue } from "../utils/budget";
import useNarrow from "../utils/useNarrow";

const series = [
    { id: "both", label: "Both", keys: ["Revenue", "Spending"] },
    { id: "revenue", label: "Revenue", keys: ["Revenue"] },
    { id: "spending", label: "Spending", keys: ["Spending"] },
];

export default function Trends() {
    const { years, getBudget } = useYear();
    const [view, setView] = useState("both");
    const narrow = useNarrow();
    const keys = series.find((s) => s.id === view).keys;

    const data = [...years].reverse().map((y) => {
        const budget = getBudget(y);
        return { year: `FY ${y}`, Revenue: totalRevenue(budget), Spending: budget.operating_expenses.total };
    });

    const first = data[0];
    const last = data[data.length - 1];
    const growth = ((last.Revenue - first.Revenue) / first.Revenue) * 100;
    const stats = [
        { value: `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`, label: `Revenue since ${first.year}` },
        { value: money(last.Revenue - last.Spending), label: `Margin in ${last.year}` },
        { value: `${((last.Spending / last.Revenue) * 100).toFixed(1)}%`, label: "Of revenue spent", tone: "card--yellow" },
    ];

    return (
        <Section
            id="trends"
            tone="muted"
            number="06"
            label="Budget trends"
            title="How the budget moves over time."
            lead="Revenue and spending have tracked each other closely. Switch the series to isolate one side of the ledger."
            aside={
                <div className="trends-toggle">
                    {series.map((s) => (
                        <button key={s.id} className={`pill ${view === s.id ? "pill--active" : ""}`} onClick={() => setView(s.id)}>
                            {s.label}
                        </button>
                    ))}
                </div>
            }
        >
            <div className="card trends-chart">
                <ResponsiveBar
                    data={data}
                    keys={keys}
                    indexBy="year"
                    groupMode="grouped"
                    margin={{ top: 16, right: 8, bottom: 32, left: 64 }}
                    padding={0.3}
                    innerPadding={4}
                    colors={({ id }) => (id === "Revenue" ? colors.primary.accent : colors.supplementary.tan)}
                    borderRadius={6}
                    enableLabel={false}
                    axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 5, format: money }}
                    axisBottom={{ tickSize: 0, tickPadding: 10, format: (v) => (narrow ? `'${v.slice(-2)}` : v) }}
                    valueFormat={money}
                    theme={{
                        axis: { ticks: { text: { fontSize: 12, fill: "var(--text-muted)" } } },
                        grid: { line: { stroke: "var(--border)", strokeDasharray: "4 4" } },
                    }}
                />
            </div>

            <div className="trends-stats">
                {stats.map((s) => (
                    <div key={s.label} className={`card ${s.tone ?? ""}`}>
                        <strong>{s.value}</strong>
                        <span className="eyebrow">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="card trends-table">
                <table>
                    <thead>
                        <tr>
                            <th>Fiscal year</th>
                            <th>Revenue</th>
                            <th>Spending</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => {
                            const prev = data[i - 1];
                            const change = prev ? ((row.Revenue - prev.Revenue) / prev.Revenue) * 100 : null;
                            return (
                                <tr key={row.year}>
                                    <td>{row.year}</td>
                                    <td>{money(row.Revenue)}</td>
                                    <td>{money(row.Spending)}</td>
                                    <td className={change < 0 ? "trends-down" : ""}>
                                        {change === null ? "—" : `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Section>
    );
}
