import { lazy } from 'react';
const TableHeadRow = lazy(() => import('./TableHeadRow'));

interface SortableTableProps<T extends object> {
	columns: { key: keyof T; text: string }[];
	children: React.ReactNode;
	handleSort: (key: keyof T) => void;
	sortKey: keyof T;
	sortOrder: 'asc' | 'desc';
	currentItems: number;
	showActions?: boolean;
}

const SortableTable = <T extends object>({
	columns,
	children,
	handleSort,
	sortKey,
	sortOrder,
	currentItems,
	showActions
}: SortableTableProps<T>) => {
	return (
		<div className='overflow-auto w-full h-auto rounded-md border  dark:border-sky-400 dark:border-opacity-30 border-r-0 text-sm'>
			<table className={`w-full text-center`}>
				<thead className='border-b font-medium dark:border-sky-400 dark:border-opacity-30'>
					<TableHeadRow
						{...{
							showActions,
							columns,
							handleSort,
							sortKey,
							sortOrder
						}}
					/>
				</thead>
				{children}
				{currentItems >= 10 ? (
					<tfoot className='border-b font-medium dark:border-sky-400 dark:border-opacity-30'>
						<TableHeadRow
							{...{
								showActions,
								columns,
								handleSort,
								sortKey,
								sortOrder
							}}
						/>
					</tfoot>
				) : null}
			</table>
		</div>
	);
};

export default SortableTable;
