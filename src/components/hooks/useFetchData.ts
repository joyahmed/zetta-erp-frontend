import { useCallback, useEffect, useState } from 'react';

interface FetchDataProps {
	query: string;
	page: number;
}

interface UseFetchDataResult<T> {
	data: T[];
	totalItems: number;
	loading: boolean;
	error: string | null;
}

interface UseFetchDataProps<T> {
	query: string;
	page: number;
	fetchData: (args: FetchDataProps) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
	fetchInitialData?: boolean;
}

export const useFetchData = <T>({
	query,
	page,
	fetchData,
	fetchInitialData
}: UseFetchDataProps<T>): UseFetchDataResult<T> => {
	const [data, setData] = useState<T[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchDataAsync = useCallback(async () => {
		try {
			setLoading(true);
			// Fetch data from API
			const response = await fetchData({ query, page });
			if (!response || !response.data) {
				console.error('Invalid response format.');
				return;
			}
			setTotalItems(response.totalItems || 0);

			// ✅ Prepend new data if not first page, else replace data
			setData(prevData => {
				if (page === 1 || query) return response.data;
				return [...response.data, ...prevData]; // ✅ Prepend new data
			});
		} catch (err: any) {
			setError(err.message || 'Error fetching data');
		} finally {
			setLoading(false);
		}
	}, [query, page, fetchData, fetchInitialData]);

	// Fetch data whenever query or page changes
	useEffect(() => {
		fetchDataAsync();
	}, [query, page, fetchInitialData]);

	return { data, totalItems, loading, error };
};
