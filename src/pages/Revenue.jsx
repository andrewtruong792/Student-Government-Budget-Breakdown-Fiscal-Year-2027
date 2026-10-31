import './Revenue.css'
import { useYear } from '../context/YearContext';

export default function Revenue() {
    const { year, budget } = useYear();
    const total = budget.operating_budget.operating_revenues.total;

    return (
        <>
            <h1 className="revenue-placeholder">Revenue</h1>
            <p>FY{year} operating revenues: ${total.toLocaleString()}</p>
        </>
    );
}
