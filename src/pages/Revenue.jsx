import './Revenue.css'
import { useYear } from '../context/YearContext';
import InfoCard from '../components/InfoCard';
import RevenueChart from '../components/RevenueChart';

export default function Revenue() {
    const { year, budget } = useYear();
    const total = budget.operating_revenues.total;

    return (
        <>
            <h1 className="revenue-placeholder">Revenue</h1>
            <section className="revenue-cards">
                <InfoCard
                    variant="stacked"
                    title={`Where FY${year} revenue comes from`}
                    body={`Total operating revenues: $${total.toLocaleString()}`}
                    graphic={<RevenueChart />}
                />
            </section>
        </>
    );
}
