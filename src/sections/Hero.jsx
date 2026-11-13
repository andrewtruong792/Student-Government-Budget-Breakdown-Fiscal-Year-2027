// Hero.jsx
import "./Hero.css";
import campus from "../assets/campusBG.png";
import CountUp from "../components/CountUp";
import { useYear } from "../context/YearContext";
import { totalRevenue } from "../utils/budget";

export default function Hero() {
    const { year, budget } = useYear();
    const stats = [
        { label: "Total revenue", value: <CountUp value={totalRevenue(budget)} /> },
        { label: "Total spending", value: <CountUp value={budget.operating_expenses.total} /> },
        { label: "Students served", value: "31,000" },
        { label: "Report updated", value: "Jan 2026" },
    ];

    return (
        <section id="top" className="hero" style={{ backgroundImage: `linear-gradient(color-mix(in srgb, var(--text) 55%, transparent), color-mix(in srgb, var(--text) 95%, transparent)), url(${campus})` }}>
            <div className="hero__inner">
                <p className="hero__badge">Fiscal year {year - 1}-{year.slice(2)} · Student Government</p>
                <h1>Where every<br />dollar goes.</h1>
                <p className="hero__lead">
                    A plain-language breakdown of UT Dallas's FY{year.slice(2)} budget, built by Student Government.
                </p>
                <div className="hero__buttons">
                    <a className="pill pill--yellow" href="#overview">Explore the breakdown</a>
                    <a className="pill hero__outline" href="#revenue">See where it comes from</a>
                </div>
                <div className="hero__stats">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <span className="eyebrow">{s.label}</span>
                            <strong>{s.value}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
