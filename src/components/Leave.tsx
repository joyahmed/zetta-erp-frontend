import { lazy, Suspense, useEffect, useState } from 'react';

const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);

import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import LeaveForm from './LeaveForm';
import { menuItems } from './menu/hrm-menu-items';
import LeaveTableBody from './table/table-bodies/LeaveTableBody';
import { leaveColumns } from './table/table-columns/leave-columns';

const Leave = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);

	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	// Reset pager when user types a new search
	useEffect(() => setPage(1), [query]);

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
		<Suspense
			fallback={<div className='p-6 text-center'>Loading…</div>}
		>
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_leaves`,
					columns: leaveColumns,
					fetchData,
					headingText: 'Leave Requests',
					buttonText: 'Leave',
					searchBoxText: 'Find Leave',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: LeaveTableBody,
					bulkDelete: true,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<LeaveForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'hrm/leaves'
											: 'hrm/leaves/bulk-delete',
									item:
										action === 'delete'
											? 'Leave Request'
											: 'All Leave Requests'
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

export default Leave;
