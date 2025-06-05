import { lazy } from 'react';
const SortIcon = lazy(() => import('../icons/SortIcon'));
const TableHead = lazy(() => import('./TableHead'));

interface TableHeadRowProps<T extends object> {
	showActions?: boolean;
	columns: {
		key: keyof T;
		text: string;
	}[];
	handleSort: (key: keyof T) => void;
	sortKey: keyof T;
	sortOrder: 'asc' | 'desc';
}

const TableHeadRow = <T extends object>({
	showActions,
	columns,
	handleSort,
	sortKey,
	sortOrder
}: TableHeadRowProps<T>) => {
	return (
		<tr>
			{!showActions ? null : <TableHead text='Actions' />}
			{columns.map(item => (
				<th
					key={String(item.key)}
					className={`border-r px-3 py-4 dark:border-sky-400 dark:border-opacity-30 whitespace-nowrap bg-gray-200 text-sky-700
					${
						item.key === 'id'
							? 'cursor-text'
							: 'cursor-pointer'
					}`}
					onClick={() =>
						item.key !== 'id'
							? handleSort(item.key)
							: null
					}
				>
					{item.text}
					{item.key !== 'id' &&
						sortKey === item.key && (
							<SortIcon sortOrder={sortOrder} />
						)}
				</th>
			))}
		</tr>
	);
};

export default TableHeadRow;
