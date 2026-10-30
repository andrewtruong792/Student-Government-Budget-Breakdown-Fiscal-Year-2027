// Header.jsx
import "./Header.css";
import logo from "../assets/squareSGlogo.png";
import YearSelector from "./YearSelector";

const yearPages = ["/report-overview", "/revenue", "/expenses"];

export default function Header() {
    const showYear = yearPages.includes(window.location.pathname);

    return (
        <header className="site-header" style={{ position: 'relative', zIndex: 10 }}>
            <a href="/" className="header-logo">
                <img src={logo} alt="Student Government Logo" />
                
                <p flow="vertical">UTD<br/>BUDGET</p>
            </a>
            <nav className="header-nav">
                {showYear && <YearSelector />}

                <a href="/">Home</a>

                <a href="/report-overview">Report Overview</a>

                <a href="/revenue">Revenue</a>

                <a href="/expenses">Expenses</a>

                <a href="/budget-trends">Budget Trends</a>

                <a href="/about-us">About Us</a>

            </nav>
        </header>
    );
}