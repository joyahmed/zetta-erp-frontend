import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

// Define the type for the employee status data
interface EmployeeStatus {
	status: string;
	count: number;
}

const EmployeeStatusChart = () => {
	const [data, setData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: [],
		datasets: []
	});

	const apiUrl = `${window.zettaSettingsData.api_url}`;

	useEffect(() => {
		fetch(`${apiUrl}hrm/dashboard`)
			.then(res => res.json())
			.then(result => {
				// Ensure data is an array and is mapped correctly
				if (
					!result.employee_status ||
					!Array.isArray(result.employee_status)
				) {
					console.error(
						'Invalid API response for employee_status',
						result
					);
					return;
				}

				const labels = result.employee_status.map(
					(status: EmployeeStatus) => status.status
				);
				const counts = result.employee_status.map(
					(status: EmployeeStatus) => status.count
				);

				setData({
					labels: labels,
					datasets: [
						{
							label: 'Employee Status',
							data: counts,
							backgroundColor: [
								'#4CAF50',
								'#FFC107',
								'#2196F3',
								'#E91E63'
							]
						}
					]
				});
			})
			.catch(error =>
				console.error('Error fetching employee status:', error)
			);
	}, []);

	return <Pie data={data} />;
};

export default EmployeeStatusChart;
