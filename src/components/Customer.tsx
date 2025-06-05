const DeleteForm = lazy(() => import('@/components/DeleteForm'));
const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { customerColumns } from '@/components/table/table-columns/customer-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/crm-menu-items';
const CustomerTableBody = lazy(
	() => import('@/components/table/table-bodies/CustomerTableBody')
);
const CustomerForm = lazy(() => import('./CustomerForm'));

const Customer = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'crm/customer'
	});

	const { data, totalItems, loading } = useFetchData<CustomerProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_customer`,
					columns: customerColumns,
					fetchData,
					headingText: 'Customers',
					buttonText: 'Customer',
					searchBoxText: 'Find Customer',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: CustomerTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<CustomerForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'crm/customer'
											: 'crm/customer/bulk-delete',
									item:
										action === 'delete' ? 'Customer' : 'All Customer'
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
export default Customer;
