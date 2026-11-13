// Header.jsx
import "./Header.css";
import logo from "../assets/logo.webp";
import YearSelector from "./YearSelector";
import { sections } from "../utils/sections";

export default function Header() {
    return (
        <header className="site-header">
            <a href="#top" className="header-logo">
                <img src={logo} alt="Student Government Logo" />
                <div>
                    <strong>Budget Breakdown</strong>
                    <span>Student Government · UT Dallas</span>
                </div>
            </a>
            <nav className="header-nav">
                {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`}>{s.label}</a>
                ))}
            </nav>
            <YearSelector />
        </header>
    );
}
