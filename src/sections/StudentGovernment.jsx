// StudentGovernment.jsx
import "./StudentGovernment.css";
import Section from "../components/Section";
import Donut from "../components/Donut";
import Track from "../components/Track";
import { colorAt, money, percent, sum } from "../utils/budget";

const allocations = [
    { label: "Student Organizations", value: 780000, body: "Registered student orgs, competition teams and org travel grants." },
    { label: "Events & Traditions", value: 520000, body: "Homecoming, spirit events and the campus traditions students expect every year." },
    { label: "Campus Services & Advocacy", value: 430000, body: "Services students ask for, plus advocacy and accessibility programs." },
    { label: "Operations & Reserve", value: 410000, body: "SG office operations and the year-end reserve." },
    { label: "Travel & Conferences", value: 310000, body: "Student delegations to conferences and advocacy days in Austin and Washington." },
];

export default function StudentGovernment() {
    const total = sum(allocations);

    return (
        <Section
            id="sg"
            number="05"
            label="Student Government"
            title="Where your student fees go."
            lead="Budget Breakdown is run out of the Student Government office. This is the slice of student money our team allocates directly, split by what it funds."
        >
            <div className="sg-grid">
                <div className="card donut-area sg-chart">
                    <Donut rows={allocations} label="SG allocation" value={money(total)} />
                </div>
                <ul className="card legend-list sg-list">
                    {allocations.map((row, i) => {
                        const color = colorAt(i);
                        return (
                            <li key={row.label}>
                                <div className="legend-row">
                                    <span className="dot" style={{ background: color }} />
                                    <span className="legend-row__label">{row.label}</span>
                                    <strong>{money(row.value)}</strong>
                                </div>
                                <p>{row.body}</p>
                                <Track width={percent(row.value, total)} color={color} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}
