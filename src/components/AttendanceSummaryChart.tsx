import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Define TypeScript interface for attendance summary data
interface AttendanceSummaryData {
	attendance_date: string;
	present_count: number;
	absent_count: number;
}

const AttendanceSummaryChart = () => {
	const [data, setData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: [],
		datasets: []
	});

	useEffect(() => {
		fetch('/wp-json/erp/dashboard')
			.then(res => res.json())
			.then(result => {
				// Ensure attendance_summary data is valid
				if (
					!result.attendance_summary ||
					!Array.isArray(result.attendance_summary)
				) {
					console.error(
						'Invalid API response for attendance summary',
						result
					);
					return;
				}

				// Extract labels and data points
				const labels = result.attendance_summary.map(
					(entry: AttendanceSummaryData) => entry.attendance_date
				);
				const present = result.attendance_summary.map(
					(entry: AttendanceSummaryData) => entry.present_count
				);
				const absent = result.attendance_summary.map(
					(entry: AttendanceSummaryData) => entry.absent_count
				);

				// Update state with formatted data
				setData({
					labels: labels,
					datasets: [
						{
							label: 'Present',
							data: present,
							backgroundColor: 'rgba(0, 128, 0, 0.6)' // Green with opacity
						},
						{
							label: 'Absent',
							data: absent,
							backgroundColor: 'rgba(255, 0, 0, 0.6)' // Red with opacity
						}
					]
				});
			})
			.catch(error =>
				console.error(
					'Error fetching attendance summary data:',
					error
				)
			);
	}, []);

	return <Bar data={data} />;
};

export default AttendanceSummaryChart;
