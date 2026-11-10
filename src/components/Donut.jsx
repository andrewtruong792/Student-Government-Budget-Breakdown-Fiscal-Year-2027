// Donut.jsx
import "./Donut.css";
import { palette, sum } from "../utils/budget";

export default function Donut({ rows, label, value, caption }) {
    const total = sum(rows);
    let start = 0;
    const stops = rows.map((row, i) => {
        const end = start + (row.value / total) * 100;
        const stop = `${palette[i % palette.length]} ${start}% ${end}%`;
        start = end;
        return stop;
    });

    return (
        <div className="donut" style={{ "--stops": stops.join(", ") }}>
            <div className="donut__center">
                <span className="eyebrow">{label}</span>
                <strong>{value}</strong>
                {caption && <span>{caption}</span>}
            </div>
        </div>
    );
}
