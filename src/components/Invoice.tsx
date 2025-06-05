import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { invoiceColumns } from '@/components/table/table-columns/invoice-colum';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/accounts-menu-items';
const InvoiceTableBody = lazy(
	() => import('@/components/table/table-bodies/InvoiceTableBody')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));
const InvoiceForm = lazy(() => import('./InvoiceForm'));
const ViewInvoice = lazy(() => import('./ViewInvoice'));

const DeleteForm = lazy(() => import('@/components/DeleteForm'));

const Invoice = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'accounts/invoice'
	});

	const { data, totalItems, loading } = useFetchData<InvoiceProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_invoice`,
					columns: invoiceColumns,
					fetchData,
					headingText: 'Invoice',
					buttonText: 'Invoice',
					searchBoxText: 'Find Invoice',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: InvoiceTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<InvoiceForm />
						) : action === 'view' ? (
							<ViewInvoice />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'accounts/invoice'
											: 'accounts/invoice/bulk-delete',
									item:
										action === 'delete' ? 'Invoice' : 'All Invoice'
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

export default Invoice;
