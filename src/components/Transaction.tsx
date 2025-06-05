const ClientWrapper = lazy(
	() => import('@/components/ClientWrapper')
);
const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/accounts-menu-items';
import { transactionColumns } from './table/table-columns/transaction-column';
const TransactionForm = lazy(() => import('./TransactionForm'));

const TransactionTableBody = lazy(
	() => import('./table/table-bodies/TransactionTableBody')
);

const Transaction = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'accounts/transaction'
	});

	const { data, totalItems, loading } =
		useFetchData<TransactionProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_transaction`,
					columns: transactionColumns,
					fetchData,
					headingText: 'Transactions',
					buttonText: 'Transaction',
					searchBoxText: 'Find Transactions',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: TransactionTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<TransactionForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'accounts/transaction'
											: 'accounts/transaction/bulk-delete',
									item:
										action === 'delete'
											? 'Transaction'
											: 'All Transaction'
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

export default Transaction;
