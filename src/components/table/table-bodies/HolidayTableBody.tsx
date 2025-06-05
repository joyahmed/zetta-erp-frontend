import { formatDate } from '@/utils/format-date';
import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface HolidayyTableProps {
	tableData: HolidaysProps[] | undefined;
}

const HolidayTableBody = ({ tableData }: HolidayyTableProps) => {
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
									showView: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />

						<TableCell {...{ text: item?.holiday_name || 'N/A' }} />
						<TableCell {...{ text: item?.description || 'N/A' }} />

						<TableCell {...{ text: item?.holiday_type || 'N/A' }} />

						<TableCell
							{...{
								text: formatDate(item.start_date?.toString()) || 'N/A'
							}}
						/>
						<TableCell
							{...{
								text: formatDate(item.end_date?.toString()) || 'N/A'
							}}
						/>
						<TableCell {...{ text: item.holiday_status || 'N/A' }} />
					</tr>
				))
			) : (
				<tr>
					<td
						colSpan={11}
						className='text-center py-4 text-gray-500 dark:text-gray-400 italic'
					>
						No data found
					</td>
				</tr>
			)}
		</tbody>
	);
};

export default HolidayTableBody;
