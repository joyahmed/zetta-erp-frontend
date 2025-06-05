const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { employeeColumns } from '@/components/table/table-columns/employee-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';
const EmployeeForm = lazy(() => import('./EmployeeForm'));
const ViewEmployee = lazy(() => import('./ViewEmployee'));
const EmployeeTableBody = lazy(
	() => import('./table/table-bodies/EmployeeTableBody')
);

const Employee = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'hrm/employee'
	});

	const { data, totalItems, loading } = useFetchData<EmployeeProps>({
		query,
		page,
		fetchData,
		fetchInitialData
	});

	// Determine the modal content based on the action
	const modalContent =
		action === 'create' || action === 'edit' ? (
			<EmployeeForm />
		) : action === 'view' ? (
			<ViewEmployee />
		) : (
			<DeleteForm
				{...{
					route:
						action === 'delete'
							? 'hrm/employee'
							: 'hrm/employee/bulk-delete',
					item: action === 'delete' ? 'Employee' : 'All Employees'
				}}
			/>
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_employee`,
					columns: employeeColumns,
					fetchData,
					headingText: 'Employees',
					buttonText: 'Employee',
					searchBoxText: 'Find Employee',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: EmployeeTableBody,
					modalContent,
					dynamicClass: action === 'delete' ? 'items-center' : '',
					dynamicClassTwo:
						action === 'delete'
							? 'w-full sm:w-[400px]'
							: action === 'view'
							? 'w-full sm:w-[90%] lg:w-[70%] 2xl:w-[50%]'
							: 'w-full sm:w-[90%] lg:w-[70%]',
					bulkDelete: true
				}}
			/>
		</Suspense>
	);
};

export default Employee;
