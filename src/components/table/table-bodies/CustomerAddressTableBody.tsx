import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface CustomerAddressTableBodyProps {
	tableData?: CustomerAddressProps[];
}

const CustomerAddressTableBody = ({
	tableData = []
}: CustomerAddressTableBodyProps) => {
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
									link: '/customeraddress',
									route: 'customeraddress',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell {...{ text: item.customer_name || 'N/A' }} />
						<TableCell {...{ text: item.address_line_1 || 'N/A' }} />
						<TableCell {...{ text: item.address_line_2 || 'N/A' }} />
						<TableCell {...{ text: item.city || 'N/A' }} />
						<TableCell {...{ text: item.state || 'N/A' }} />
						<TableCell {...{ text: item.postal_code || 'N/A' }} />
						<TableCell {...{ text: item.country || 'N/A' }} />
						<TableCell {...{ text: item.address_type || 'N/A' }} />
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

export default CustomerAddressTableBody;
