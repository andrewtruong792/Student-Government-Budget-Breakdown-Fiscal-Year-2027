// Expenses.jsx
import "./Expenses.css";
import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Section from "../components/Section";
import CountUp from "../components/CountUp";
import { useYear } from "../context/YearContext";
import { colors, expenseRows, money, percent } from "../utils/budget";
import useNarrow from "../utils/useNarrow";

function shorten(label) {
    return label.length > 16 ? `${label.slice(0, 15)}…` : label;
}

export default function Expenses() {
    const { year, years, budget, getBudget } = useYear();
    const narrow = useNarrow();
    const rows = expenseRows(budget);
    const total = budget.operating_expenses.total;
    const [selected, setSelected] = useState(rows[0].label);
    const active = rows.find((row) => row.label === selected) ?? rows[0];

    const lastYear = String(year - 1);
    const previous = years.includes(lastYear)
        ? getBudget(lastYear).operating_expenses.rows.find((row) => row.label === active.label)
        : null;
    const change = previous ? ((active.value - previous.value) / previous.value) * 100 : null;

    return (
        <Section
            id="expenses"
            tone="dark"
            number="04"
            label="Expenses"
            title="Where the money actually goes."
            lead="Instruction and research take the largest share. Select a category to see its size and its share of the whole budget."
        >
            <div className="expenses-grid">
                <div className="expenses-chart">
                    <ResponsiveBar
                        data={[...rows].reverse()}
                        keys={["value"]}
                        indexBy="label"
                        layout="horizontal"
                        margin={{ top: 8, right: 16, bottom: 8, left: narrow ? 120 : 230 }}
                        padding={0.45}
                        colors={(bar) => (bar.data.label === active.label ? colors.primary.mint : colors.supplementary.yellow)}
                        borderRadius={10}
                        enableGridY={false}
                        enableLabel={false}
                        axisBottom={null}
                        axisLeft={{ tickSize: 0, tickPadding: 12, format: narrow ? shorten : undefined }}
                        tooltip={() => null}
                        onClick={(bar) => setSelected(bar.data.label)}
                        theme={{ axis: { ticks: { text: { fontSize: 13, fill: "var(--cream)" } } } }}
                    />
                </div>

                <div className="card expenses-detail">
                    <span className="expenses-tag">FY{year.slice(2)}</span>
                    <h3>{active.label}</h3>
                    <strong><CountUp value={active.value} /></strong>
                    <p className="expenses-full">
                        <CountUp value={active.value} format={(v) => `$${Math.round(v).toLocaleString()}`} />
                    </p>

                    <div className="expenses-share">
                        <span className="eyebrow">Share of spending</span>
                        <span>{percent(active.value, total)}</span>
                    </div>
                    <div className="track">
                        <span style={{ width: percent(active.value, total), background: "var(--accent)" }} />
                    </div>

                    {change !== null && (
                        <p className="expenses-change">
                            {change >= 0 ? "Up" : "Down"} {Math.abs(change).toFixed(1)}% from FY{lastYear.slice(2)}.
                        </p>
                    )}

                    <div className="expenses-foot">
                        <span>Tap any bar to switch</span>
                        <span>{money(total)} total</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
