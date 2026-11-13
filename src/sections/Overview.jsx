// Overview.jsx
import "./Overview.css";
import Section from "../components/Section";
import CountUp from "../components/CountUp";
import Track from "../components/Track";
import { useYear } from "../context/YearContext";
import { expenseRows, money, percent, revenueSources, totalRevenue } from "../utils/budget";

const steps = [
    { title: "Collect the source", body: "The annual operating budget and audited financial statements." },
    { title: "Group it consistently", body: "Every line is filed under the same categories each year, so comparisons hold." },
    { title: "Have students review it", body: "The Student Government budget team checks each total before publishing." },
];

export default function Overview() {
    const { budget } = useYear();
    const sources = revenueSources(budget);
    const expenses = expenseRows(budget);
    const revenue = totalRevenue(budget);
    const spending = budget.operating_expenses.total;

    const stats = [
        { value: <CountUp value={revenue} />, label: "Revenue", body: "Money coming in", tone: "card--dark" },
        { value: <CountUp value={spending} />, label: "Spending", body: "Money going out" },
        { value: expenses.length, label: "Categories", body: "Every line is grouped", tone: "card--yellow" },
        { value: sources.length, label: "Revenue streams", body: "Where funding starts" },
    ];

    return (
        <Section
            id="overview"
            number="02"
            label="Report overview"
            title="The whole budget, on one page."
            lead={`UT Dallas brings in ${money(budget.operating_revenues.total)} in operating revenue and spends ${money(spending)} on operations. State appropriations, investment income and reserves cover the gap. This report follows the money from where it comes in to where it goes out.`}
        >
            <div className="overview-stats">
                {stats.map((s) => (
                    <div key={s.label} className={`card ${s.tone ?? ""}`}>
                        <strong>{s.value}</strong>
                        <span className="eyebrow">{s.label}</span>
                        <p>{s.body}</p>
                    </div>
                ))}
            </div>

            <div className="overview-grid">
                <div className="card">
                    <span className="eyebrow">How we built this report</span>
                    <ol className="overview-steps">
                        {steps.map((step, i) => (
                            <li key={step.title}>
                                <h3><span>{String(i + 1).padStart(2, "0")}</span> {step.title}</h3>
                                <p>{step.body}</p>
                            </li>
                        ))}
                    </ol>
                    <p className="overview-note">
                        Figures come from the university's Annual Financial Reports and Annual Budget Reports,
                        provided with help from the Office of Budget and Finance. Values are approximations; refer
                        to the full Student Government Budget Breakdown report for exact numbers.
                    </p>
                </div>

                <div className="card card--dark">
                    <span className="eyebrow overview-yellow">Largest line items</span>
                    {expenses.slice(0, 4).map((row) => {
                        const share = percent(row.value, spending);
                        return (
                            <div key={row.label} className="overview-item">
                                <div className="overview-item__head">
                                    <span>{row.label}</span>
                                    <span>{share}</span>
                                </div>
                                <Track width={share} color="var(--yellow)" className="overview-track" />
                            </div>
                        );
                    })}
                    <a className="overview-yellow overview-link" href="#expenses">See the full spending list ↗</a>
                </div>
            </div>
        </Section>
    );
}
