import './Expenses.css'
import { useYear } from '../context/YearContext';

export default function Expenses() {
    const { year, budget } = useYear();
    const total = budget.operating_budget.operating_expenses.total;

    return (
        <>
            <h1 className="expenses-placeholder">Expenses</h1>
            <p>FY{year} operating expenses: ${total.toLocaleString()}</p>
        </>
    );
}
