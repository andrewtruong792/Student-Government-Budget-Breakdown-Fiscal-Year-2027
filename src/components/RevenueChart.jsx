// RevenueChart.jsx
import "./RevenueChart.css";
import { ResponsiveBar } from "@nivo/bar";
import { useYear } from "../context/YearContext";

function toChartData(rows) {
    const [tuition, discounts, ...rest] = rows;
    return [{ label: "Net Tuition and Fees", value: tuition.value + discounts.value }, ...rest]
        .filter((row) => row.value > 0)
        .sort((a, b) => a.value - b.value);
}

export default function RevenueChart() {
    const { budget } = useYear();

    return (
        <div className="revenue-chart">
            <ResponsiveBar
                data={toChartData(budget.operating_revenues.rows)}
                keys={["value"]}
                indexBy="label"
                layout="horizontal"
                margin={{ top: 4, right: 80, bottom: 4, left: 320 }}
                padding={0.3}
                colors="#C75B12"
                borderRadius={4}
                enableGridY={false}
                axisBottom={null}
                axisLeft={{ tickSize: 0, tickPadding: 12 }}
                valueFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
                labelPosition="end"
                labelOffset={10}
                labelTextColor="#111111"
                theme={{
                    axis: { ticks: { text: { fontSize: 14, fill: "#4B5563" } } },
                    labels: { text: { fontSize: 14, fontWeight: 600 } },
                }}
            />
        </div>
    );
}
