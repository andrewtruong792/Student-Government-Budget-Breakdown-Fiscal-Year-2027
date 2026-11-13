// Events.jsx
import "./Events.css";
import Section from "../components/Section";
import Icon from "../components/Icon";

export default function Events() {
    return (
        <Section
            id="events"
            number="07"
            label="Upcoming events"
            title="What's coming up next."
            lead="Every flyer we post on Instagram lands here. Tap a flyer to open the original post."
            aside={<a className="pill events-pill" href="https://instagram.com/utdsg">@utdsg</a>}
        >
            <div className="card events-empty">
                <span className="icon-circle events-icon"><Icon name="calendar" size={20} /></span>
                <h3>No events posted yet.</h3>
                <p>New flyers show up here as soon as they go out. Check back soon or follow along on Instagram.</p>
            </div>
        </Section>
    );
}
