import CrudActions from '@/components/table/CrudActions';
import TableCell from '@/components/table/TableCell';
import { formatDate } from '@/utils/format-date';

interface InvoiceTableBodyProps {
	tableData?: InvoiceProps[];
}

const InvoiceTableBody = ({
	tableData = []
}: InvoiceTableBodyProps) => {
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
									link: '/invoice',
									route: 'invoice',
									showView: true,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell
							{...{ text: item.invoice_unique_id || 'N/A' }}
						/>
						<TableCell {...{ text: item.customer_name || 'N/A' }} />
						<TableCell>
							{/* Table Data */}
							{item.invoice_items?.map(inv => (
								<div
									key={inv.id}
									className='flex flex-col w-full py-1 '
								>
									<span className='w-1/5 text-blue-500 font-semibold'>
										Name: {inv.item_name}
									</span>
									<span className='w-1/5 '>Qty: {inv.quantity}</span>
									<span className='w-1/5 '>Price: {inv.price}</span>
									<span className='w-1/5 '>
										Discount:
										{inv?.item_discount?.toString() !== '0'
											? ` ${inv?.item_discount} %`
											: ' N/A'}
									</span>
									<span className='w-1/5 '>Total: {inv.total}</span>
								</div>
							))}
						</TableCell>
						<TableCell>
							<span>
								{item?.total_discount?.toString() !== '0.00'
									? `${item?.total_discount} %`
									: 'N/A'}
							</span>
						</TableCell>
						<TableCell
							{...{ text: formatDate(item?.invoice_date) || 'N/A' }}
						/>
						<TableCell {...{ text: item.total_amount || '0.00' }} />
						<TableCell {...{ text: item.total_paid || '0.00' }} />
						<TableCell
							{...{ text: item.remaining_amount || '0.00' }}
						/>
						<TableCell {...{ text: item.status || 'N/A' }} />
						<TableCell
							{...{
								text: formatDate(item?.due_date) || 'N/A'
							}}
						/>
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

export default InvoiceTableBody;
