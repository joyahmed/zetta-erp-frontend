import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';
import { leaveRequestColumns } from './table/table-columns/leave-request-columns';
const EmployeeLeaveRequestForm = lazy(
	() => import('./EmployeeLeaveRequestForm')
);
const LeaveRequestTableBody = lazy(
	() => import('./table/table-bodies/LeaveRequestTableBody')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));

const EmployeeLeaveRequest = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);

	const {
		globalState: { fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/leaves'
	});

	const { data, totalItems, loading } =
		useFetchData<LeaveRequestProps>({
			query,
			page,
			fetchData,
			fetchInitialData
		});

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
					totalItems,
					loading,
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_leave`,
					columns: leaveRequestColumns,
					fetchData,
					headingText: 'Leave Requests',
					buttonText: 'Leave Request',
					searchBoxText: 'Find Leave Request',
					showCreate: true,
					showSearch: true,
					showActions: false,
					TableBody: LeaveRequestTableBody,
					modalContent: <EmployeeLeaveRequestForm />,
					dynamicClass: 'items-center',
					dynamicClassTwo: 'w-full sm:w-[70%] lg:w-[50%] 2xl:w-[40%]'
				}}
			/>
		</Suspense>
	);
};

export default EmployeeLeaveRequest;
