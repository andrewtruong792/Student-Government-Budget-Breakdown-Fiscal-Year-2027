// Footer.jsx
import "./Footer.css";
import { useYear } from "../context/YearContext";
import { sections } from "../utils/budget";

export default function Footer() {
    const { year } = useYear();

    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div>
                    <h2>Public money,<br /><em>publicly explained.</em></h2>
                    <p>
                        Budget Breakdown is a Student Government project at The University of Texas at Dallas,
                        built to make the university's budget readable in a few minutes.
                    </p>
                </div>
                <div>
                    <p className="footer-heading">Report sections</p>
                    {sections.map((s) => (
                        <a key={s.id} href={`#${s.id}`}>{s.label}</a>
                    ))}
                </div>
                <div>
                    <p className="footer-heading">Contact</p>
                    <a href="mailto:sg@utdallas.edu">sg@utdallas.edu</a>
                    <a href="https://instagram.com/utdsg">@utdsg</a>
                    <span>Student Government · UT Dallas</span>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 Budget Breakdown · Fiscal Year {year - 1}-{year.slice(2)}</span>
                <span>Source: UT Dallas Annual Budget Reports</span>
            </div>
        </footer>
    );
}
