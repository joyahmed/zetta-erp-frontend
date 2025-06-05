import { HEADERS } from '@/utils/get-headers';

interface UseInitialDataProps {
	query: string;
	page: number;
	url: string;
}

export const useInitialData = ({
	query,
	page,
	url
}: UseInitialDataProps) => {
	const fetchData = async () => {
		const apiUrl = `${window.zettaSettingsData.api_url}${url}?index=${page}&query=${query}`;

		try {
			const response = await fetch(apiUrl, {
				method: 'GET',
				headers: HEADERS,
				credentials: 'include'
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const result = await response.json();
			return {
				data: result.data || [],
				totalItems: result.total_items || 0
			};
		} catch (error) {
			console.error('Error fetching data:', error);
			return undefined;
		}
	};

	return {
		fetchData
	};
};
