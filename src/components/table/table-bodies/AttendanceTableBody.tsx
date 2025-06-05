import { formatDate } from '@/utils/format-date';
import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface AttendanceTableBodyProps {
	tableData: AttendanceProps[] | undefined;
}

const AttendanceTableBody = ({
	tableData
}: AttendanceTableBodyProps) => {
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
									id: item.id,
									link: '/attendance',
									route: 'attendance',
									showView: false,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						<TableCell
							text={item.first_name + ' ' + item.last_name || 'N/A'}
						/>
						<TableCell
							{...{
								text:
									formatDate(item.attendance_date.toString()) || 'N/A'
							}}
						/>
						<TableCell {...{ text: item.status || 'N/A' }} />
						<TableCell
							{...{ text: item?.check_in_time?.toString() || 'N/A' }}
						/>
						<TableCell
							{...{ text: item?.check_out_time?.toString() || 'N/A' }}
						/>
						{/* <TableCell
							{...{ text: item?.created_at?.toString() || 'N/A' }}
						/>
						<TableCell
							{...{ text: item?.updated_at?.toString() || 'N/A' }}
						/> */}
					</tr>
				))
			) : (
				<tr>
					<td
						colSpan={8}
						className='text-center py-4 text-gray-500 dark:text-gray-400 italic'
					>
						No data found
					</td>
				</tr>
			)}
		</tbody>
	);
};

export default AttendanceTableBody;
