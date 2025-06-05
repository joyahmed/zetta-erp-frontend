const DynamicForm = lazy(() => import('@/components/DynamicForm'));
import { useGlobal } from '@/context/GlobalContext';
import { lazy } from 'react';
import { useDynamicForm } from './hooks/useDynamicForm';

const CustomerForm = () => {
	const { globalState } = useGlobal();
	const { action, id } = globalState;

	// Define form fields
	const customerFields = [
		{
			label: 'Customer Name',
			type: 'text',
			name: 'customer_name',
			required: true
		},
		{
			label: 'Phone Number',
			type: 'text',
			name: 'phone_number',
			required: true
		},
		{
			label: 'Email',
			type: 'text',
			name: 'email',
			required: true
		},
		{
			label: 'Note',
			type: 'text',
			name: 'note'
		}
	];

	const submitUrl =
		action === 'create'
			? `${window.zettaSettingsData.api_url}crm/customer`
			: `${window.zettaSettingsData.api_url}crm/customer/edit/${id}`;

	const page = 'zetta_erp_customer';

	const { formData, handleChange, handleSubmit, errors } =
		useDynamicForm(
			customerFields,
			`${window.zettaSettingsData.api_url}crm/customer/${id}`,
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
					} Customer`,
					fields: customerFields,
					data: formData,
					onChange: handleChange,
					onSubmit: handleSubmit,
					errors
				}}
			/>
		</div>
	);
};

export default CustomerForm;
