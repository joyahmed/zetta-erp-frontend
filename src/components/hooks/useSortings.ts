import { useCallback, useState } from 'react';

type SortOrder = 'asc' | 'desc';

interface SortableTableProps<T extends object> {
	data: T[];
	columns: { key: keyof T; text: string }[];
}

const useSorting = <T extends object>({
	data,
	columns
}: SortableTableProps<T>) => {
	const [sortKey, setSortKey] = useState<keyof T>(columns[0].key);
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const handleSort = useCallback(
		(key: keyof T) => {
			if (sortKey === key && sortOrder === 'asc') {
				setSortOrder('desc');
			} else {
				setSortKey(key);
				setSortOrder('asc');
			}
		},
		[sortKey, sortOrder]
	);

	const sortData = useCallback(
		({
			tableData,
			sortKey,
			reverse
		}: {
			tableData: T[];
			sortKey: keyof T;
			reverse: boolean;
		}) => {
			if (sortKey === undefined) return tableData;

			const sortedData = tableData.slice().sort((a, b) => {
				const aValue = a[sortKey] ?? '';
				const bValue = b[sortKey] ?? '';

				if (aValue > bValue) return 1;
				if (aValue < bValue) return -1;
				return 0;
			});

			if (reverse) {
				return sortedData.reverse();
			}

			return sortedData;
		},
		[]
	);

	const sortedData = useCallback(
		() =>
			sortData({
				tableData: data,
				sortKey: sortKey as keyof T,
				reverse: sortOrder === 'desc'
			}),
		[data, sortKey, sortOrder, sortData]
	);

	return { handleSort, sortKey, sortOrder, sortedData };
};

export default useSorting;
