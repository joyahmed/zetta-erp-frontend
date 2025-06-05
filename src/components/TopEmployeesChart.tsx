import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Define TypeScript interface for top employees data
interface TopEmployee {
	first_name: string;
	last_name: string;
	total_hours: number;
}

const TopEmployeesChart = () => {
	const [data, setData] = useState<{ labels: string[]; datasets: any[] }>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		fetch('/wp-json/erp/dashboard')
			.then((res) => res.json())
			.then((result) => {
				// Ensure top_employees data is valid
				if (!result.top_employees || !Array.isArray(result.top_employees)) {
					console.error('Invalid API response for top employees', result);
					return;
				}

				// Extract labels and data points
				const labels = result.top_employees.map(
					(emp: TopEmployee) => `${emp.first_name} ${emp.last_name}`
				);
				const hours = result.top_employees.map(
					(emp: TopEmployee) => emp.total_hours
				);

				// Update state with formatted data
				setData({
					labels: labels,
					datasets: [
						{
							label: 'Total Working Hours',
							data: hours,
							backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue with opacity
							borderColor: 'blue',
							borderWidth: 1,
						},
					],
				});
			})
			.catch((error) => console.error('Error fetching top employees data:', error));
	}, []);

	return <Bar data={data} />;
};

export default TopEmployeesChart;
