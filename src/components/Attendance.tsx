const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
const AttendanceForm = lazy(
	() => import('@/components/AttendanceForm')
);
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';
import { attendanceColumns } from './table/table-columns/attendance-columns';

const AttendanceTableBody = lazy(
	() => import('./table/table-bodies/AttendanceTableBody')
);

const Attendance = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/attendance'
	});

	const { data, totalItems, loading } = useFetchData<AttendanceProps>(
		{
			query,
			page,
			fetchData,
			fetchInitialData
		}
	);

	// empty commit

	return (
		<Suspense>
			<ClientWrapper
				{...{
					menuItems,
					query,
					setQuery,
					page,
					setPage,
					initialData: data,
					totalItems: totalItems,
					loading,
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_attendance`,
					columns: attendanceColumns,
					fetchData,
					headingText: 'Attendance Records',
					buttonText: 'Attendance',
					searchBoxText: 'Find Attendance',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: AttendanceTableBody,
					bulkDelete: true,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<AttendanceForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'hrm/attendance'
											: 'hrm/attendance/bulk-delete',
									item:
										action === 'delete'
											? 'Attendance'
											: 'All Attendance'
								}}
							/>
						),
					dynamicClass: 'items-center',
					dynamicClassTwo:
						action === 'delete'
							? 'w-full sm:w-[400px]'
							: 'w-full sm:w-[70%] lg:w-[50%] 2xl:w-[40%]'
				}}
			/>
		</Suspense>
	);
};

export default Attendance;
