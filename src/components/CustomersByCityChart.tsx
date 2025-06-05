import { HEADERS } from '@/utils/get-headers';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

interface CustomersByCityData {
	city: string;
	total_customers: number;
}

const CustomersByCityChart = () => {
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
				if (!Array.isArray(result.customers_by_city)) return;

				const labels = result.customers_by_city.map(
					(entry: CustomersByCityData) => entry.city
				);
				const counts = result.customers_by_city.map(
					(entry: CustomersByCityData) => entry.total_customers
				);

				setData({
					labels,
					datasets: [
						{
							label: 'Customers',
							data: counts,
							backgroundColor: [
								'#1F77B4',
								'#FF7F0E',
								'#2CA02C',
								'#D62728',
								'#9467BD',
								'#8C564B',
								'#E377C2',
								'#7F7F7F',
								'#BCBD22',
								'#17BECF',
								'#1B4F72',
								'#117A65',
								'#76448A',
								'#4A235A',
								'#D68910',
								'#6E2C00',
								'#2874A6',
								'#641E16',
								'#1E8449',
								'#9C640C',
								'#D4AC0D',
								'#212F3C',
								'#7D6608',
								'#A04000',
								'#5D6D7E',
								'#839192',
								'#512E5F',
								'#E74C3C',
								'#F39C12',
								'#27AE60',
								'#2980B9',
								'#8E44AD',
								'#2C3E50',
								'#7F8C8D',
								'#D35400',
								'#C0392B',
								'#BDC3C7',
								'#34495E',
								'#16A085',
								'#F1C40F',
								'#E67E22',
								'#AAB7B8',
								'#45B39D',
								'#5B2C6F',
								'#1ABC9C',
								'#2E86C1',
								'#EC7063',
								'#48C9B0',
								'#F4D03F',
								'#D5DBDB',
								'#A93226',
								'#AF7AC5',
								'#85C1E9',
								'#58D68D',
								'#F5B041',
								'#B3B6B7',
								'#9B59B6',
								'#DC7633'
							]
						}
					]
				});
			})
			.catch(err =>
				console.error('Error fetching customers by city:', err)
			);
	}, []);

	return <Bar data={data} />;
};

export default CustomersByCityChart;
