// YearSelector.jsx
import "./YearSelector.css";
import { useYear } from "../context/YearContext";

export default function YearSelector() {
    const { year, setYear, years } = useYear();

    return (
        <select className="year-selector" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
                <option key={y} value={y}>{y}</option>
            ))}
        </select>
    );
}
