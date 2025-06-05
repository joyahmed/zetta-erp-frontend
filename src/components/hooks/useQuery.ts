import { Dispatch, SetStateAction, useEffect } from 'react';

interface UseQueryHookProps<T> {
	route: string;
	searchText: string;
	page: number;
	initialData: T[];
	setItemState: Dispatch<
		SetStateAction<{
			data: T[] | undefined;
			filteredData: T[] | undefined;
			page: number;
			searchText: string;
		}>
	>;
}

export const useQuery = <T extends object>({
	route,
	page,
	searchText,
	initialData,
	setItemState
}: UseQueryHookProps<T>) => {
	useEffect(() => {
		// Function to update query parameters
		const updateUrl = (
			key: string,
			value: string | number | null
		) => {
			const url = new URL(window.location.href);
			if (value) {
				url.searchParams.set(key, String(value));
			} else {
				url.searchParams.delete(key);
			}
			window.history.pushState({}, '', url.toString());
		};

		// Update for searchText
		if (searchText) {
			updateUrl('query', searchText);
		} else {
			updateUrl('query', null);
		}

		setItemState(prev => ({
			...prev,
			data: initialData
		}));
	}, [searchText, route, initialData, setItemState]);

	useEffect(() => {
		// Update for page
		if (page) {
			const updateUrl = (
				key: string,
				value: string | number | null
			) => {
				const url = new URL(window.location.href);
				if (value) {
					url.searchParams.set(key, String(value));
				} else {
					url.searchParams.delete(key);
				}
				window.history.pushState({}, '', url.toString());
			};

			updateUrl('index', page);
		}
		if (searchText) {
			const updateUrl = (
				key: string,
				value: string | number | null
			) => {
				const url = new URL(window.location.href);
				if (value) {
					url.searchParams.set(key, String(value));
				} else {
					url.searchParams.delete(key);
				}
				window.history.pushState({}, '', url.toString());
			};

			updateUrl('index', 1);
		}

		setItemState(prev => ({
			...prev,
			data: initialData
		}));
	}, [searchText, page, route, initialData, setItemState]);
};
