// Revenue.jsx
import "./Revenue.css";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import Donut from "../components/Donut";
import CountUp from "../components/CountUp";
import PillToggle from "../components/PillToggle";
import Track from "../components/Track";
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

    useEffect(() => {
        setSelected(null);
    }, [year]);

    const rows = revenueSources(budget).filter((row) => filter === "all" || row.type === filter);
    const total = sum(rows);
    const activeRow = rows.find((row) => row.label === selected) ?? rows[0];

    function changeFilter(id) {
        setFilter(id);
        setSelected(null);
    }

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
                    <PillToggle className="revenue-filters" options={filters} value={filter} onChange={changeFilter} />
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
                        {rows.map((row, i) => {
                            const color = colorAt(i);
                            const share = percent(row.value, total);
                            return (
                                <li
                                    key={row.label}
                                    className={row === activeRow ? "is-active" : ""}
                                    onClick={() => setSelected(row.label)}
                                >
                                    <div className="revenue-row">
                                        <span className="dot" style={{ background: color }} />
                                        <span className="revenue-row__label">{row.label}</span>
                                        <strong><CountUp value={row.value} /></strong>
                                        <span className="revenue-row__pct">{share}</span>
                                    </div>
                                    <Track width={share} color={color} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
