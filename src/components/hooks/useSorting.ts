import { useCallback, useState } from 'react';

type SortOrder = 'asc' | 'desc';

interface SortableTableProps<T extends object> {
	data: T[];
	columns: { key: keyof T; text: string }[];
	setItemState: React.Dispatch<React.SetStateAction<{
		data: T[] | undefined;
		filteredData: T[] | undefined;
		page: number;
		searchText: string;
	}>>;
}

const useSorting = <T extends object>({
	data,
	columns,
	setItemState
}: SortableTableProps<T>) => {
	const [sortKey, setSortKey] = useState<keyof T>(columns[0].key);
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

	const handleSort = useCallback(
		(key: keyof T) => {
			// ✅ Toggle sort order
			setSortOrder(prevOrder => {
				const newOrder = prevOrder === 'asc' ? 'desc' : 'asc';

				// ✅ Apply sorting and update state directly with the correct order
				setItemState(prev => {
					// ✅ Ensure data is never undefined (fallback to empty array)
					const sortedData = [...(prev.data ?? [])].sort((a, b) => {
						const aValue = a[key] ?? '';
						const bValue = b[key] ?? '';

						if (aValue > bValue) return newOrder === 'asc' ? 1 : -1;
						if (aValue < bValue) return newOrder === 'asc' ? -1 : 1;
						return 0;
					});

					return {
						...prev,
						data: sortedData,
						filteredData: sortedData
					};
				});

				return newOrder; // ✅ Update the sortOrder state correctly
			});

			setSortKey(key); // ✅ Ensure sortKey updates correctly
		},
		[setItemState]
	);

	return { handleSort, sortKey, sortOrder };
};

export default useSorting;
