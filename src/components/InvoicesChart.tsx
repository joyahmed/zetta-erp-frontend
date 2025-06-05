import { HEADERS } from '@/utils/get-headers';
import {
	ArcElement,
	Chart as ChartJS,
	Legend,
	Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

interface InvoiceData {
	status: string;
	total_invoices: number;
}

const InvoicesChart = () => {
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
				if (!Array.isArray(result.invoices)) return;

				const labels = result.invoices.map(
					(entry: InvoiceData) => entry.status
				);
				const invoiceCounts = result.invoices.map(
					(entry: InvoiceData) => entry.total_invoices
				);

				setData({
					labels,
					datasets: [
						{
							label: 'Invoices',
							data: invoiceCounts,
							backgroundColor: ['#000080', '#2e8b57', '#800080']
						}
					]
				});
			});
	}, []);

	return <Doughnut data={data} />;
};

export default InvoicesChart;
