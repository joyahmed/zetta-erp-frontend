const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { departmentColumns } from '@/components/table/table-columns/department-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';

const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
const DepartmentTableBody = lazy(
	() => import('@/components/table/table-bodies/DepartmentTableBody')
);
const DepartmentForm = lazy(
	() => import('@/components/DepartmentForm')
);

const Department = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/department'
	});

	const { data, totalItems, loading } = useFetchData<DepartmentProps>(
		{
			query,
			page,
			fetchData,
			fetchInitialData
		}
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_department`,
					columns: departmentColumns,
					fetchData,
					headingText: 'Departments',
					buttonText: 'Department',
					searchBoxText: 'Find Department',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: DepartmentTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<DepartmentForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'hrm/department'
											: 'hrm/department/bulk-delete',
									item:
										action === 'delete'
											? 'Department'
											: 'All Department'
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
export default Department;
