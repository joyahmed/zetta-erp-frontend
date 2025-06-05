import CrudActions from '@/components/table/CrudActions';
import TableCell from '@/components/table/TableCell';
import { formatDate } from '@/utils/format-date';

interface TransactionTableBodyProps {
	tableData?: TransactionProps[];
}

const TransactionTableBody = ({
	tableData = []
}: TransactionTableBodyProps) => {
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
									link: '/transactions',
									route: 'transactions',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell
							{...{ text: item?.invoice_unique_id || 'N/A' }}
						/>
						<TableCell {...{ text: item?.customer_name || 'N/A' }} />
						<TableCell
							{...{
								text: item?.paid_amount
									? `${item?.paid_amount}`
									: 'N/A'
							}}
						/>
						<TableCell {...{ text: item?.method_name || 'N/A' }} />
						<TableCell
							{...{ text: item?.transaction_type || 'N/A' }}
						/>
						<TableCell
							{...{
								text: formatDate(item?.transaction_date) || 'N/A'
							}}
						/>
						<TableCell {...{ text: item?.notes || 'N/A' }} />
					</tr>
				))
			) : (
				<tr>
					<td
						colSpan={6}
						className='text-center py-4 text-gray-500 dark:text-gray-400 italic'
					>
						No data found
					</td>
				</tr>
			)}
		</tbody>
	);
};

export default TransactionTableBody;
