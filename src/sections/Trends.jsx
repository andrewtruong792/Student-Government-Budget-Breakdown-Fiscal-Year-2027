// Trends.jsx
import "./Trends.css";
import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Section from "../components/Section";
import PillToggle from "../components/PillToggle";
import { getBudget, years } from "../context/YearContext";
import { colors, money, percent, percentChange, signedPercent, totalRevenue } from "../utils/budget";
import useNarrow from "../utils/useNarrow";

const series = [
    { id: "both", label: "Both", keys: ["Revenue", "Spending"] },
    { id: "revenue", label: "Revenue", keys: ["Revenue"] },
    { id: "spending", label: "Spending", keys: ["Spending"] },
];

const data = [...years].reverse().map((y) => {
    const budget = getBudget(y);
    return { year: `FY ${y}`, Revenue: totalRevenue(budget), Spending: budget.operating_expenses.total };
});

const first = data[0];
const last = data[data.length - 1];
const stats = [
    { value: signedPercent(percentChange(first.Revenue, last.Revenue)), label: `Revenue since ${first.year}` },
    { value: money(last.Revenue - last.Spending), label: `Margin in ${last.year}` },
    { value: percent(last.Spending, last.Revenue), label: "Of revenue spent", tone: "card--yellow" },
];

const margin = { top: 16, right: 8, bottom: 32, left: 64 };
const theme = {
    axis: { ticks: { text: { fontSize: 12, fill: "var(--text-muted)" } } },
    grid: { line: { stroke: "var(--border)", strokeDasharray: "4 4" } },
};

export default function Trends() {
    const [view, setView] = useState("both");
    const narrow = useNarrow();
    const keys = series.find((s) => s.id === view).keys;

    return (
        <Section
            id="trends"
            tone="muted"
            number="06"
            label="Budget trends"
            title="How the budget moves over time."
            lead="Revenue and spending have tracked each other closely. Switch the series to isolate one side of the ledger."
            aside={<PillToggle className="pill-toggle trends-toggle" options={series} value={view} onChange={setView} />}
        >
            <div className="card trends-chart">
                <ResponsiveBar
                    data={data}
                    keys={keys}
                    indexBy="year"
                    groupMode="grouped"
                    margin={margin}
                    padding={0.3}
                    innerPadding={4}
                    colors={({ id }) => (id === "Revenue" ? colors.primary.accent : colors.supplementary.tan)}
                    borderRadius={6}
                    enableLabel={false}
                    axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 5, format: money }}
                    axisBottom={{ tickSize: 0, tickPadding: 10, format: (v) => (narrow ? `'${v.slice(-2)}` : v) }}
                    valueFormat={money}
                    theme={theme}
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
                            const change = prev ? percentChange(prev.Revenue, row.Revenue) : null;
                            return (
                                <tr key={row.year}>
                                    <td>{row.year}</td>
                                    <td>{money(row.Revenue)}</td>
                                    <td>{money(row.Spending)}</td>
                                    <td className={change !== null && change < 0 ? "trends-down" : ""}>
                                        {signedPercent(change)}
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
