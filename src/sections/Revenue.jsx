// Revenue.jsx
import "./Revenue.css";
import { useState } from "react";
import Section from "../components/Section";
import Donut from "../components/Donut";
import CountUp from "../components/CountUp";
import { useYear } from "../context/YearContext";
import { colorAt, percent, revenueSources, sum } from "../utils/budget";

const filters = [
    { id: "all", label: "All sources" },
    { id: "operating", label: "Operating" },
    { id: "non-operating", label: "Non-operating" },
];

export default function Revenue() {
    const { year, budget } = useYear();
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);

    const rows = revenueSources(budget).filter((row) => filter === "all" || row.type === filter);
    const total = sum(rows);
    const activeRow = rows.find((row) => row.label === selected) ?? rows[0];

    return (
        <Section
            id="revenue"
            tone="muted"
            number="03"
            label="Revenue"
            title="Where the money comes from."
            lead="Tuition and state support still carry most of the budget. Tap a source to see how much it contributes."
        >
            <div className="card revenue-card">
                <div className="revenue-toolbar">
                    <div className="revenue-filters">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                className={`pill ${filter === f.id ? "pill--active" : ""}`}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <span><CountUp value={total} /> total</span>
                </div>

                <div className="revenue-body">
                    <div className="revenue-chart-area">
                        <Donut
                            key={`${year}-${filter}`}
                            rows={rows}
                            label={activeRow.label}
                            value={<CountUp value={activeRow.value} />}
                            caption={`${percent(activeRow.value, total)} of total`}
                        />
                    </div>
                    <ul className="revenue-list">
                        {rows.map((row, i) => (
                            <li
                                key={row.label}
                                className={row === activeRow ? "is-active" : ""}
                                onClick={() => setSelected(row.label)}
                            >
                                <div className="revenue-row">
                                    <span className="dot" style={{ background: colorAt(i) }} />
                                    <span className="revenue-row__label">{row.label}</span>
                                    <strong><CountUp value={row.value} /></strong>
                                    <span className="revenue-row__pct">{percent(row.value, total)}</span>
                                </div>
                                <div className="track">
                                    <span style={{ width: percent(row.value, total), background: colorAt(i) }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
