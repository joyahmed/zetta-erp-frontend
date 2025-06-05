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

interface ProfitLossData {
	revenue: number;
	total_expense: number;
	net_profit: number;
}

const ProfitLossChart = () => {
	const [data, setData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: ['Profit & Loss'],
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
				// ✅ Check if profit_loss exists and has at least one item
				if (
					!result.profit_loss ||
					!Array.isArray(result.profit_loss) ||
					result.profit_loss.length === 0
				) {
					console.warn('No Profit & Loss data available');
					return;
				}

				// ✅ Safely extract revenue, total_expense, and net_profit
				const { revenue, total_expense, net_profit } = result
					.profit_loss[0] ?? {
					revenue: 0,
					total_expense: 0,
					net_profit: 0
				};

				setData({
					labels: ['Profit & Loss'],
					datasets: [
						{
							label: 'Revenue',
							data: [revenue],
							backgroundColor: 'blue'
						},
						{
							label: 'Total Expense',
							data: [total_expense],
							backgroundColor: 'red'
						},
						{
							label: 'Net Profit',
							data: [net_profit],
							backgroundColor: 'green'
						}
					]
				});
			})
			.catch(error =>
				console.error('Error fetching profit & loss data:', error)
			);
	}, []);

	return <Bar data={data} />;
};

export default ProfitLossChart;
