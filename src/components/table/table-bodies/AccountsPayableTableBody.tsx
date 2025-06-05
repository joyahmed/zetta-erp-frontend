import { lazy } from 'react';
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface AccountsPayableTableBodyProps {
	tableData?: AccountsPayableProps[];
}

const AccountsPayableTableBody = ({
	tableData = []
}: AccountsPayableTableBodyProps) => {
	return (
		<tbody>
			{tableData.length > 0 ? (
				tableData.map((item, index) => (
					<tr
						key={item.id}
						className='border dark:border-sky-500/30 border-l-0 border-r-0 border-b-0'
					>
						<TableCell {...{ text: index + 1 }} />
						<TableCell
							{...{ text: item.invoice_unique_id || 'N/A' }}
						/>
						<TableCell {...{ text: item.customer_name || 'N/A' }} />
						<TableCell {...{ text: item.payable_amount || '0' }} />
						<TableCell {...{ text: item.payment_status || 'N/A' }} />
					</tr>
				))
			) : (
				<tr>
					<td
						colSpan={7}
						className='text-center py-4 text-gray-500 dark:text-gray-400 italic'
					>
						No data found
					</td>
				</tr>
			)}
		</tbody>
	);
};

export default AccountsPayableTableBody;
