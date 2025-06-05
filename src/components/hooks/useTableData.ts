import { useGlobal } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';
import useHandleSearch from './useHandleSearch';
import useSorting from './useSorting';

export const useTableData = <T extends object>({
	query,
	setQuery,
	setPage,
	initialData,
	totalItems,
	columns,
	fetchData
}: UseTableDataProps<T>) => {
	const {
		globalState: { fetchInitialData }
	} = useGlobal();
	const [itemState, setItemState] = useState({
		data: initialData,
		filteredData: initialData,
		page: 1,
		searchText: ''
	});

	useEffect(() => {
		if (initialData || fetchInitialData) {
			setItemState(prev => ({
				...prev,
				data: initialData,
				filteredData: initialData
			}));
		}
	}, [initialData, fetchInitialData]);

	// console.log(`debug: fetchInitialData =>`, fetchInitialData);

	const { searchText, page, data, filteredData } = itemState;

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
	});

	const dataArray = searchText ? data : filteredData;

	// console.log(`debug: dataArray =>`, dataArray);

	const handleLoadMore = async () => {
		if (dataArray && dataArray.length >= totalItems) return;

		let nextPage = page + 1;
		const maxPages = Math.ceil(totalItems / 10);

		if (nextPage > maxPages && page > 1) {
			nextPage = 1;
			setPage(1);
			await fetchData({ query, page: 1 });
		}

		setItemState(prev => ({
			...prev,
			page: nextPage
		}));

		setPage(nextPage);
	};

	const { handleSort, sortKey, sortOrder } = useSorting<T>({
		data: filteredData || [],
		columns,
		setItemState
	});

	return {
		itemState,
		setItemState,
		handleSearch,
		inputValue,
		dataArray,
		handleLoadMore,
		handleSort,
		sortKey,
		sortOrder
	};
};
