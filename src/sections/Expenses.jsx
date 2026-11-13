// Expenses.jsx
import "./Expenses.css";
import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Section from "../components/Section";
import CountUp from "../components/CountUp";
import Track from "../components/Track";
import { getBudget, useYear, years } from "../context/YearContext";
import { colors, expenseRows, formatPercent, fy, money, percent, percentChange, previousYear } from "../utils/budget";
import useNarrow from "../utils/useNarrow";

const theme = { axis: { ticks: { text: { fontSize: 13, fill: "var(--cream)" } } } };

function shorten(label) {
    return label.length > 16 ? `${label.slice(0, 15)}…` : label;
}

function dollars(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

export default function Expenses() {
    const { year, budget } = useYear();
    const narrow = useNarrow();
    const rows = expenseRows(budget);
    const total = budget.operating_expenses.total;
    const [selected, setSelected] = useState(rows[0].label);
    const active = rows.find((row) => row.label === selected) ?? rows[0];
    const share = percent(active.value, total);

    const lastYear = previousYear(year);
    const previous = years.includes(lastYear)
        ? getBudget(lastYear).operating_expenses.rows.find((row) => row.label === active.label)
        : null;
    const change = previous ? percentChange(previous.value, active.value) : null;

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
                        theme={theme}
                    />
                </div>

                <div className="card expenses-detail">
                    <span className="eyebrow expenses-tag">{fy(year)}</span>
                    <h3>{active.label}</h3>
                    <strong><CountUp value={active.value} /></strong>
                    <p className="expenses-full">
                        <CountUp value={active.value} format={dollars} />
                    </p>

                    <div className="expenses-share">
                        <span className="eyebrow">Share of spending</span>
                        <span>{share}</span>
                    </div>
                    <Track width={share} color="var(--accent)" />

                    {change !== null && (
                        <p className="expenses-change">
                            {change >= 0 ? "Up" : "Down"} {formatPercent(Math.abs(change))} from {fy(lastYear)}.
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
