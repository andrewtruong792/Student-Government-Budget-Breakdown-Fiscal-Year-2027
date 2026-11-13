// Donut.jsx
import "./Donut.css";
import { colorAt, sum } from "../utils/budget";

export default function Donut({ rows, label, value, caption }) {
    const total = sum(rows);
    let start = 0;
    const stops = rows.map((row, i) => {
        const end = start + (row.value / total) * 100;
        const stop = `${colorAt(i)} ${start}% ${end}%`;
        start = end;
        return stop;
    });

    return (
        <div className="donut" style={{ "--stops": stops.join(", ") }}>
            <div className="donut__center">
                <span className="eyebrow">{label}</span>
                <strong>{value}</strong>
                {caption && <span className="donut__caption">{caption}</span>}
            </div>
        </div>
    );
}
