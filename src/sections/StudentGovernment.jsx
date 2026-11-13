// StudentGovernment.jsx
import "./StudentGovernment.css";
import Section from "../components/Section";
import Donut from "../components/Donut";
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
                <div className="card sg-chart">
                    <Donut rows={allocations} label="SG allocation" value={money(total)} />
                </div>
                <ul className="card sg-list">
                    {allocations.map((row, i) => (
                        <li key={row.label}>
                            <div className="sg-row">
                                <span className="dot" style={{ background: colorAt(i) }} />
                                <span>{row.label}</span>
                                <strong>{money(row.value)}</strong>
                            </div>
                            <p>{row.body}</p>
                            <div className="track">
                                <span style={{ width: percent(row.value, total), background: colorAt(i) }} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
