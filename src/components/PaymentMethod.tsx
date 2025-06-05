const DeleteForm = lazy(() => import('@/components/DeleteForm'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { paymentMethodColumns } from '@/components/table/table-columns/payment-method-columns';
import { useGlobal } from '@/context/GlobalContext';
import { getAdminUrl } from '@/utils/get-admin-url';
import { lazy, Suspense, useState } from 'react';
import { menuItems } from './menu/accounts-menu-items';
const PaymentMethodTableBody = lazy(
	() =>
		import('@/components/table/table-bodies/PaymentMethodTableBody')
);
const ClientWrapper = lazy(() => import('./ClientWrapper'));
const PaymentMethodForm = lazy(() => import('./PaymentMethodForm'));

const PaymentMethod = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const {
		globalState: { action, fetchInitialData }
	} = useGlobal();

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'accounts/payment-method'
	});

	const { data, totalItems, loading } =
		useFetchData<PaymentMethodProps>({
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
					mainRoute: `${getAdminUrl()}admin.php?page=zetta_erp_payment_method`,
					columns: paymentMethodColumns,
					fetchData,
					headingText: 'Payment Method',
					buttonText: 'Payment Method',
					searchBoxText: 'Find Payment Method',
					showCreate: true,
					showSearch: true,
					showActions: true,
					TableBody: PaymentMethodTableBody,
					modalContent:
						action === 'create' || action === 'edit' ? (
							<PaymentMethodForm />
						) : (
							<DeleteForm
								{...{
									route:
										action === 'delete'
											? 'accounts/payment-method'
											: 'accounts/payment-method/bulk-delete',
									item:
										action === 'delete'
											? 'Payment Method'
											: 'All Payment Method'
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
export default PaymentMethod;
