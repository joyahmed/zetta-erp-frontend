const DynamicForm = lazy(() => import('@/components/DynamicForm'));
import { useGlobal } from '@/context/GlobalContext';
import { lazy } from 'react';
import { useDynamicForm } from './hooks/useDynamicForm';

const PaymentMethodForm = () => {
	const { globalState } = useGlobal();
	const { action, id } = globalState;

	// Define form fields
	const paymentMethodFields = [
		{
			label: 'Method Name',
			type: 'text',
			name: 'method_name',
			required: true
		}
	];

	const submitUrl =
		action === 'create'
			? `${window.zettaSettingsData.api_url}accounts/payment-method`
			: `${window.zettaSettingsData.api_url}accounts/payment-method/edit/${id}`;

	const page = 'zetta_erp_payment_method';

	const { formData, handleChange, handleSubmit, errors } =
		useDynamicForm(
			paymentMethodFields,
			`${window.zettaSettingsData.api_url}accounts/payment-method/${id}`,
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
					} Payment Method`,
					fields: paymentMethodFields,
					data: formData,
					onChange: handleChange,
					onSubmit: handleSubmit,
					errors
				}}
			/>
		</div>
	);
};

export default PaymentMethodForm;
