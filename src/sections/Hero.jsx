// Hero.jsx
import "./Hero.css";
import hero828 from "../assets/hero-828.webp";
import hero1280 from "../assets/hero-1280.webp";
import hero1920 from "../assets/hero-1920.webp";
import CountUp from "../components/CountUp";
import { useYear } from "../context/YearContext";
import { fiscalYear, fy, totalRevenue } from "../utils/budget";

export default function Hero() {
    const { year, budget } = useYear();
    const stats = [
        { label: "Total revenue", value: <CountUp value={totalRevenue(budget)} /> },
        { label: "Total spending", value: <CountUp value={budget.operating_expenses.total} /> },
        { label: "Students served", value: "31,000" },
        { label: "Report updated", value: "Jan 2026" },
    ];

    return (
        <section id="top" className="hero">
            <img
                className="hero__bg"
                src={hero1920}
                srcSet={`${hero828} 828w, ${hero1280} 1280w, ${hero1920} 1920w`}
                sizes="100vw"
                alt=""
                fetchPriority="high"
            />
            <div className="section__inner hero__inner">
                <p className="eyebrow hero__badge">Fiscal year {fiscalYear(year)} · Student Government</p>
                <h1>Where every<br />dollar goes.</h1>
                <p className="hero__lead">
                    A plain-language breakdown of UT Dallas's {fy(year)} budget, built by Student Government.
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
