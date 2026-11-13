// About.jsx
import "./About.css";
import Section from "../components/Section";
import Icon from "../components/Icon";

const values = [
    { icon: "usersRound", title: "Student-run", body: "Written and reviewed by students, not staff." },
    { icon: "refresh", title: "Updated yearly", body: "Republished each fall with the new budget." },
    { icon: "sparkles", title: "No jargon", body: "Every category explained in a sentence." },
];

const team = [
    { name: "David Baker", role: "Co-Committee Chair", group: "Leadership" },
    { name: "Divya Sakthivel", role: "Budget Analyst Chair", group: "Budget Analysts" },
    { name: "Colton Rupe", role: "Programming Chair", group: "Programming" },
];

function initials(name) {
    return name.split(" ").map((part) => part[0]).join("");
}

export default function About() {
    return (
        <Section
            id="about"
            number="01"
            label="About us"
            title="A student team, reading the ledger out loud."
            lead="The Budget Breakdown Taskforce is a Student Government project that turns the university's financial data into clear visuals, so students can see where their tuition and fees go."
        >
            <div className="about-values card card--dark">
                {values.map((v) => (
                    <div key={v.title}>
                        <span className="icon-circle"><Icon name={v.icon} /></span>
                        <h3>{v.title}</h3>
                        <p>{v.body}</p>
                    </div>
                ))}
            </div>

            <div className="about-team">
                {team.map((person, i) => (
                    <div key={person.name} className="card">
                        <span className={i % 2 ? "about-avatar about-avatar--yellow" : "about-avatar"}>{initials(person.name)}</span>
                        <h3>{person.name}</h3>
                        <p className="about-role">{person.role}</p>
                        <p>{person.group}</p>
                    </div>
                ))}
            </div>

            <div className="about-contact card card--dark">
                <div>
                    <h3>Questions about a number?</h3>
                    <p>Ask us and we'll point you to the line item in the source document.</p>
                </div>
                <div className="about-contact__links">
                    <a className="pill pill--yellow" href="mailto:sg@utdallas.edu">sg@utdallas.edu</a>
                    <a className="pill pill--outline-dark" href="https://instagram.com/utdsg">@utdsg</a>
                </div>
            </div>
        </Section>
    );
}
