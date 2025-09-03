const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);

import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import { menuItems } from './menu/hrm-menu-items';
import { attendanceColumns } from './table/table-columns/attendance-columns';
const EmployeeAttendanceTableBody = lazy(
	() => import('./table/table-bodies/EmployeeAttendanceTableBody')
);

const EmployeeAttendance = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { fetchInitialData },
		setGlobalState
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

	const handleCheckIn = async () => {
		try {
			const res = await fetch(
				`${window.zettaSettingsData.api_url}hrm/attendance/check-in`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const json = await res.json();
			if (!res.ok) throw new Error(json.message || 'Check-in failed');
			toast.success(json.message || 'Checked in successfully!');
			//fetchData();
			setGlobalState(prev => ({
				...prev,
				fetchInitialData: !prev.fetchInitialData
			}));
		} catch (err: any) {
			console.error('Check-in error:', err);
			toast.error(
				err.message || 'Check-in failed. Please try again.'
			);
		}
	};

	const handleCheckOut = async () => {
		try {
			const res = await fetch(
				`${window.zettaSettingsData.api_url}hrm/attendance/check-out`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const json = await res.json();
			if (!res.ok)
				throw new Error(json.message || 'Check-out failed');
			toast.success(json.message || 'Checked out successfully!');
			// fetchData();
			setGlobalState(prev => ({
				...prev,
				fetchInitialData: !prev.fetchInitialData
			}));
		} catch (err: any) {
			console.error('Check-out error:', err);
			toast.error(
				err.message || 'Check-out failed. Please try again.'
			);
		}
	};

	const showCreateButtons = (
		<div className='flex items-center justify-center lg:justify-start space-x-5 w-full sm:w-[33%] max-w-[400px] text-white text-[16px] font-semibold'>
			<button
				className='bg-sky-500 hover:bg-sky-700 cursor-pointer rounded-md w-32 py-2 '
				onClick={handleCheckIn}
			>
				Check In
			</button>
			<button
				className='bg-red-500 hover:bg-red-700 cursor-pointer rounded-md w-32 py-2 '
				onClick={handleCheckOut}
			>
				Check Out
			</button>
		</div>
	);

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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_employee_attendance`,
					columns: attendanceColumns,
					fetchData,
					headingText: 'Attendance Records',
					buttonText: 'Attendance',
					searchBoxText: 'Find Attendance',
					showCreate: showCreateButtons,
					showSearch: true,
					showActions: false,
					TableBody: EmployeeAttendanceTableBody,
					dynamicClass: 'items-center'
				}}
			/>
		</Suspense>
	);
};

export default EmployeeAttendance;
