import { formatDate } from '@/utils/format-date';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy } from 'react';
const CrudActions = lazy(
	() => import('@/components/table/CrudActions')
);
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface EmployeeTableBodyProps {
	tableData: EmployeeProps[] | undefined;
}

const EmployeeTableBody = ({ tableData }: EmployeeTableBodyProps) => {
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
									route: `${getAdminUrl()}admin.php?page=zetta_erp_employee_edit&employee_id=${
										item?.id
									}`,
									showView: true,
									showBarcode: false
								}}
							/>
						</TableCell>
						<TableCell {...{ text: index + 1 }} />
						
						<TableCell>
							<span className='flex flex-col space-y-3'>
								<span>
									<span className='font-semibold text-sky-600'>
										Name:
									</span>{' '}
									{item?.first_name} {item?.last_name}
								</span>
								{item.employee_avatar ? (
									<span className='flex items-center justify-center w-full'>
										<img
											src={item.employee_avatar}
											alt={item.first_name}
											className='w-24 h-24 min-w-24 object-cover rounded'
										/>
									</span>
								) : (
									'N/A'
								)}
								<span>
									<span className='font-semibold text-sky-600'>
										Unique ID:
									</span>{' '}
									{item.employee_unique_id}
								</span>
							</span>
						</TableCell>
						<TableCell
							{...{
								text:
									formatDate(item.date_of_birth?.toString()) || 'N/A'
							}}
						/>
						<TableCell {...{ text: item.gender || 'N/A' }} />
						<TableCell>
							{item?.phone_number ? (
								<a href={`tel:${item.phone_number.toString()}`}>
									{item.phone_number}
								</a>
							) : (
								'N/A'
							)}
						</TableCell>
						<TableCell>
							{item?.email ? (
								<a href={`mailto:${item.email.toString()}`}>
									{item?.email}
								</a>
							) : (
								'N/A'
							)}
						</TableCell>
						<TableCell
							{...{ text: item?.department_name || 'N/A' }}
						/>
						<TableCell
							{...{ text: item?.designation_name || 'N/A' }}
						/>
						<TableCell
							{...{
								text:
									formatDate(item.date_of_joining?.toString()) ||
									'N/A'
							}}
						/>
						<TableCell
							{...{ text: item.employment_status || 'N/A' }}
						/>
						<TableCell {...{ text: item.salary || 'N/A' }} />
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

export default EmployeeTableBody;
