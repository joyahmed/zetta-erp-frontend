import { HEADERS } from '@/utils/get-headers';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend
);

interface IncomeExpenseData {
	month: string;
	income: number;
	expense: number;
}

const IncomeExpenseChart = () => {
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
				if (!Array.isArray(result.income_expense)) return;

				const labels = result.income_expense.map(
					(entry: IncomeExpenseData) => entry.month
				);
				const income = result.income_expense.map(
					(entry: IncomeExpenseData) => entry.income
				);
				const expense = result.income_expense.map(
					(entry: IncomeExpenseData) => entry.expense
				);

				setData({
					labels,
					datasets: [
						{
							label: 'Income',
							data: income,
							borderColor: 'green',
							fill: false
						},
						{
							label: 'Expense',
							data: expense,
							borderColor: 'red',
							fill: false
						}
					]
				});
			});
	}, []);

	return <Line data={data} />;
};

export default IncomeExpenseChart;
