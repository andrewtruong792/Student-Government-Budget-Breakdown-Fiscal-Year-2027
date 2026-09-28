// Header.jsx
import "./Header.css";
import logo from "../assets/squareSGlogo.png";

export default function Header() {
    return (
        <header className="site-header">
            <logo className="header-logo">
                <img src={logo} alt="Student Government Logo" />
                
                <p flow="vertical">UTD<br/>BUDGET</p>
            </logo>
            <nav className="header-nav">
                <a href="/report-overview">Report Overview</a>

                <a href="/revenue">Revenue</a>

                <a href="/expenses">Expenses</a>

                <a href="/budget-trends">Budget Trends</a>

                <a href="/about-us">About Us</a>

            </nav>
        </header>
    );
}