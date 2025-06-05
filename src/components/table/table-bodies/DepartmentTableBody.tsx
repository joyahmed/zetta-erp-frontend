import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface DepartmentTableBodyProps {
	tableData: DepartmentProps[] | undefined;
}

const DepartmentTableBody = ({
	tableData
}: DepartmentTableBodyProps) => {
	return (
		<tbody>
			{tableData && tableData.length > 0 ? (
				tableData.map((item, index) => (
					<tr
						key={item.id}
						className='border dark:border-sky-500/30 border-l-0 border-r-0 border-b-0'
					>
						<TableCell>
							<CrudActions
								{...{
									id: item?.id,
									link: '/departments',
									route: 'departments',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell {...{ text: item.department_name || 'N/A' }} />
					</tr>
				))
			) : (
				<tr>
					<td
						colSpan={5}
						className='text-center py-4 text-gray-500 dark:text-gray-400 italic'
					>
						No data found
					</td>
				</tr>
			)}
		</tbody>
	);
};

export default DepartmentTableBody;
