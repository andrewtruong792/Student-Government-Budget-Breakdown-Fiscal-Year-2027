// Donut.jsx
import "./Donut.css";
import { colorAt, sum } from "../utils/budget";

export default function Donut({ rows, active, ringKey, label, value, caption }) {
    const total = sum(rows);
    let start = 0;
    const stops = rows.map((row, i) => {
        const end = start + (row.value / total) * 100;
        const dimmed = active !== undefined && i !== active;
        const color = dimmed ? `color-mix(in srgb, ${colorAt(i)} 45%, transparent)` : colorAt(i);
        const stop = `${color} ${start}% calc(${end}% - 2deg), var(--white) 0 ${end}%`;
        start = end;
        return stop;
    });

    return (
        <div className="donut">
            <div key={ringKey} className="donut__ring" style={{ "--stops": stops.join(", ") }} />
            <div className="donut__center">
                <span className="eyebrow donut__label">{label}</span>
                <strong>{value}</strong>
                {caption && <span className="donut__caption">{caption}</span>}
            </div>
        </div>
    );
}
