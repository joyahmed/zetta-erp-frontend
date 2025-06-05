import CrudActions from '@/components/table/CrudActions';
import TableCell from '@/components/table/TableCell';

interface PaymentMethodTableBodyProps {
	tableData?: PaymentMethodProps[];
}

const PaymentMethodTableBody = ({
	tableData = []
}: PaymentMethodTableBodyProps) => {
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
									link: '/payment-method',
									route: 'payment-method',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell {...{ text: item.method_name || 'N/A' }} />
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

export default PaymentMethodTableBody;
