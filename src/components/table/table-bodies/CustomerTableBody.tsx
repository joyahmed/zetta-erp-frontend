import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface CustomerTableBodyProps {
	tableData?: CustomerProps[];
}

const CustomerTableBody = ({
	tableData = []
}: CustomerTableBodyProps) => {
	return (
		<tbody>
			{tableData.length > 0 ? (
				tableData.map((item, index) => (
					<tr
						key={item.id}
						className='border dark:border-sky-500/30 border-l-0 border-r-0 border-b-0'
					>
						<TableCell>
							<CrudActions
								{...{
									id: item?.id,
									link: '/customer',
									route: 'customer',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell {...{ text: item.customer_name || 'N/A' }} />
						<TableCell {...{ text: item.phone_number || 'N/A' }} />
						<TableCell {...{ text: item.email || 'N/A' }} />
						<TableCell {...{ text: item.note || 'N/A' }} />
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

export default CustomerTableBody;
