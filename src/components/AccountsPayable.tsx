const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { accountsPayableColumns } from '@/components/table/table-columns/accounts-payable-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/accounts-menu-items';
const AccountsPayableTableBody = lazy(
	() =>
		import('@/components/table/table-bodies/AccountsPayableTableBody')
);
const AccountsPayableForm = lazy(
	() => import('./AccountsPayableForm')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));

const AccountsPayable = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const { globalState } = useGlobal();
	const { action } = globalState;

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'accounts/payable'
	});

	const { data, totalItems,loading } = useFetchData<AccountsPayableProps>({
		query,
		page,
		fetchData
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_payable`,
					columns: accountsPayableColumns,
					fetchData,
					headingText: 'Payable',
					buttonText: 'Add Record',
					searchBoxText: 'Find Record',
					showCreate: false,
					showSearch: true,
					showActions: false,
					TableBody: AccountsPayableTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<AccountsPayableForm />
						) : (
							<DeleteForm
								{...{ route: 'accounts/payable', item: 'Record' }}
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

export default AccountsPayable;
