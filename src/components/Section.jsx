// Section.jsx
export default function Section({ id, number, label, title, lead, tone = "light", aside, children }) {
    return (
        <section id={id} className={`section section--${tone}`}>
            <div className="section__inner">
                <div className="section__head">
                    <div>
                        <p className="section__label"><span>{number}</span>{label}</p>
                        <h2 className="section__title">{title}</h2>
                        {lead && <p className="section__lead">{lead}</p>}
                    </div>
                    {aside}
                </div>
                {children}
            </div>
        </section>
    );
}
