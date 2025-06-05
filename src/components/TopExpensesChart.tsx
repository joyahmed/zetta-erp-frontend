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

interface TopExpenseData {
	category: string;
	total_expense: number;
}

const TopExpensesChart = () => {
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
				if (!Array.isArray(result.top_expenses)) return;
				const labels = result.top_expenses.map(
					(entry: TopExpenseData) => entry.category
				);
				const expenses = result.top_expenses.map(
					(entry: TopExpenseData) => entry.total_expense
				);
				setData({
					labels,
					datasets: [
						{
							label: 'Expenses',
							data: expenses,
							backgroundColor: 'purple'
						}
					]
				});
			});
	}, []);

	return <Bar data={data} options={{ indexAxis: 'y' }} />;
};

export default TopExpensesChart;
