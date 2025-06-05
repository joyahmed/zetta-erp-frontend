const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
const HolidayForm = lazy(() => import('@/components/HolidayForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';
import { holidayColuns } from './table/table-columns/holiday-columns';
const HolidayTableBody = lazy(
	() => import('./table/table-bodies/HolidayTableBody')
);

const Holidays = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/holiday'
	});

	const { data, totalItems, loading } = useFetchData<HolidaysProps>({
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
					totalItems: totalItems,
					loading,
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_department`,
					columns: holidayColuns,
					fetchData,
					headingText: 'Holidays',
					buttonText: 'Holiday',
					searchBoxText: 'Find Holiday',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: HolidayTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<HolidayForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'hrm/holiday'
											: 'hrm/holiday/bulk-delete',
									item:
										action === 'delete' ? 'Holiday' : 'All Holiday'
								}}
							/>
						),
					dynamicClass: 'items-center',
					dynamicClassTwo:
						action === 'delete'
							? 'w-full sm:w-[400px]'
							: 'w-full sm:w-[70%] lg:w-[50%] 2xl:w-[40%]',
					bulkDelete: true
				}}
			/>
		</Suspense>
	);
};

export default Holidays;
