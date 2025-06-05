import { HEADERS } from '@/utils/get-headers';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
);

interface CashFlowData {
	month: string;
	inflow: number;
	outflow: number;
}

const CashFlowChart = () => {
	const [data, setData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: [],
		datasets: []
	});

	const apiUrl = `${window.zettaSettingsData.api_url}`;

	useEffect(() => {
		fetch(`${apiUrl}accounts/dashboard`, {
			method: 'GET',
			headers: HEADERS,
			credentials: 'include'
		})
			.then(res => res.json())
			.then(result => {
				if (!Array.isArray(result.cash_flow)) return;

				const labels = result.cash_flow.map(
					(entry: CashFlowData) => entry.month
				);
				const inflow = result.cash_flow.map(
					(entry: CashFlowData) => entry.inflow
				);
				const outflow = result.cash_flow.map(
					(entry: CashFlowData) => entry.outflow
				);

				setData({
					labels,
					datasets: [
						{
							label: 'Cash Inflow',
							data: inflow,
							backgroundColor: 'green'
						},
						{
							label: 'Cash Outflow',
							data: outflow,
							backgroundColor: 'red'
						}
					]
				});
			});
	}, []);

	return <Bar data={data} />;
};

export default CashFlowChart;
