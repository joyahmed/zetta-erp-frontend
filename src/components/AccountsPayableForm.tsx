const DynamicForm = lazy(() => import('@/components/DynamicForm'));
import { useGlobal } from '@/context/GlobalContext';
import { lazy, useEffect, useState } from 'react';
import { useDynamicForm } from './hooks/useDynamicForm';

// Define TypeScript type for invoices
interface Invoice {
	id: number;
	invoice_unique_id: string;
}

const AccountsPayableForm = () => {
	const { globalState } = useGlobal();
	const { action, id } = globalState;

	const [invoices, setInvoices] = useState<Invoice[]>([]);

	// Fetch invoices from API
	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}accounts/payable`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data: { data: Invoice[] } = await response.json();
				// console.log('Fetched data:', data);
				if (data?.data) {
					setInvoices(data?.data);
				}
			} catch (error) {
				console.error('Error fetching invoices:', error);
			}
		};

		fetchInvoices();
	}, []);

	// Define form fields
	const accountsPayableFields = [
		{
			label: 'Supplier Name',
			type: 'text',
			name: 'supplier_name'
		}
	];

	const submitUrl =
		action === 'create'
			? `${window.zettaSettingsData.api_url}accounts/payable`
			: `${window.zettaSettingsData.api_url}accounts/payable/edit/${id}`;

	const page = 'zetta_erp_payable';

	const {
		formData,
		setFormData,
		handleChange,
		handleSubmit,
		errors
	} = useDynamicForm(
		accountsPayableFields,
		`/wp-json/accounts/payable/${id}`,
		submitUrl,
		page
	);

	return (
		<div className='py-5'>
			<DynamicForm
				{...{
					text: `${
						action === 'create'
							? 'Create'
							: action === 'view'
							? 'View'
							: action === 'edit'
							? 'Edit'
							: 'Delete'
					}`,
					fields: accountsPayableFields,
					data: formData,
					onChange: handleChange,
					onSubmit: handleSubmit,
					errors,
					options: invoices.map(item => ({
						label: item.invoice_unique_id,
						value: item.id,
						image: ''
					})),
					onSelect: (id: number) =>
						setFormData(prev => ({
							...prev,
							invoice_id: id
						}))
				}}
			/>
		</div>
	);
};

export default AccountsPayableForm;
