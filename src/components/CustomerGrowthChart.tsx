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

// ✅ Register required Chart.js components
ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend
);

// Define TypeScript interface for customer growth data
interface CustomerGrowthData {
	month: string;
	new_customers: number;
}

const CustomerGrowthChart = () => {
	const [data, setData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: [],
		datasets: []
	});

	const apiUrl = `${window.zettaSettingsData.api_url}`;

	useEffect(() => {
		fetch(`${apiUrl}crm/dashboard`, {
			method: 'GET',
			headers: HEADERS,
			credentials: 'include'
		})
			.then(res => res.json())
			.then(result => {
				if (!Array.isArray(result.customer_growth)) return;

				const labels = result.customer_growth.map(
					(entry: CustomerGrowthData) => entry.month
				);
				const customers = result.customer_growth.map(
					(entry: CustomerGrowthData) => entry.new_customers
				);

				setData({
					labels,
					datasets: [
						{
							label: 'New Customers',
							data: customers,
							borderColor: 'blue',
							backgroundColor: 'rgba(0, 0, 255, 0.2)', // Optional fill effect
							fill: true
						}
					]
				});
			})
			.catch(err =>
				console.error('Error fetching customer growth:', err)
			);
	}, []);

	return <Line data={data} />;
};

export default CustomerGrowthChart;
