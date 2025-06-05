const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { customerAddressColumns } from '@/components/table/table-columns/customer-address-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/crm-menu-items';
const CustomerAddressTableBody = lazy(
	() =>
		import('@/components/table/table-bodies/CustomerAddressTableBody')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));
const CustomerAddressForm = lazy(
	() => import('./CustomerAddressForm')
);

const CustomerAddress = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'crm/customer-address'
	});

	const { data, totalItems, loading } =
		useFetchData<CustomerAddressProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_customer_address`,
					columns: customerAddressColumns,
					fetchData,
					headingText: 'Customer Address ',
					buttonText: 'Customer Address',
					searchBoxText: 'Find Customer Address',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: CustomerAddressTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<CustomerAddressForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'crm/customer-address'
											: 'crm/customer-address/bulk-delete',
									item:
										action === 'delete'
											? 'Customer Address'
											: 'All Customer Address'
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
export default CustomerAddress;
