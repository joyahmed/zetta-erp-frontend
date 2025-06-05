const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const DesignationForm = lazy(
	() => import('@/components/DesignationForm')
);
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { designationColumns } from '@/components/table/table-columns/designation-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);

const DesignationTableBody = lazy(
	() => import('./table/table-bodies/DesignationTableBody')
);

const Designation = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/designation'
	});

	const { data, totalItems, loading } =
		useFetchData<DesignationProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_designation`,
					columns: designationColumns,
					fetchData,
					headingText: 'Designations',
					buttonText: 'Designation',
					searchBoxText: 'Find Designation',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: DesignationTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<DesignationForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'hrm/designation'
											: 'hrm/designation/bulk-delete',
									item:
										action === 'delete' ? 'Designation' : 'All Designation'
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
export default Designation;
