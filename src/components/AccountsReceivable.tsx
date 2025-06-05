const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { accountsReceivableColumns } from '@/components/table/table-columns/accounts-receivable-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/accounts-menu-items';
const AccountsReceivableTableBody = lazy(
	() =>
		import(
			'@/components/table/table-bodies/AccountsReceivableTableBody'
		)
);
const AccountsReceivableForm = lazy(
	() => import('./AccountsReceivableForm')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));

const AccountsReceivable = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const { globalState } = useGlobal();
	const { action } = globalState;

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'accounts/receivable'
	});

	const { data, totalItems, loading } =
		useFetchData<AccountsReceivableProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_receivable`,
					columns: accountsReceivableColumns,
					fetchData,
					headingText: 'Receivable',
					buttonText: 'Add Record',
					searchBoxText: 'Find Record',
					showCreate: false,
					showSearch: true,
					showActions: false,
					TableBody: AccountsReceivableTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<AccountsReceivableForm />
						) : (
							<DeleteForm
								{...{ route: 'accounts/receivable', item: 'Record' }}
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

export default AccountsReceivable;
