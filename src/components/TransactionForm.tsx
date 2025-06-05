import { HEADERS } from '@/utils/get-headers';
import { lazy, useEffect, useState } from 'react';
import { useTransactionForm } from './hooks/useTransactionForm';
const ComboBox = lazy(() => import('@/components/ComboBox'));
const SelectList = lazy(() => import('@/components/SelectList'));

const TransactionForm = () => {
	const {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitTransaction,
		filteredInvoices,
		inputValue,
		handleSearch,
		handleLoadMore,
		paymentMethods
	} = useTransactionForm();

	const [itemState, setItemState] = useState({
		total_amount: 0,
		remaining_amount: 0
	});

	// console.log(`debug: formData =>`, formData);

	useEffect(() => {
		const fetchInvoice = async () => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}accounts/invoice/${formData.invoice_id}`,
					{
						method: 'GET',
						headers: HEADERS,
						credentials: 'include'
					}
				);
				const data = await response.json();
				if (data) {
					setItemState({
						total_amount: data?.total_amount,
						remaining_amount: data?.remaining_amount
					});
				}
			} catch (error: any) {
				console.error('Error fetching invoice:', error);
			}
		};
		fetchInvoice();
	}, [formData.invoice_id]);

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Transaction'
					: action === 'edit'
					? 'Edit Transaction'
					: 'View Transaction'}
			</h1>

			<div className='space-y-4'>
				<div className='flex flex-wrap items-center justify-center w-full font-bold gap-3 md:gap-5'>
					<div className='shadow rounded-md p-2 w-full md:w-[48%]'>
						Total Amount:{' '}
						{itemState.total_amount ||
							'(Select invoice to get value)'}
					</div>
					<div className='text-red-600 shadow rounded-md p-2 w-full md:w-[48%]'>
						Remaining Amount:{' '}
						{itemState.remaining_amount ||
							'(Select invoice to get value)'}
					</div>
				</div>
				{/* Customer Selection */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Invoice ID
						</label>
						<ComboBox
							{...{
								options: filteredInvoices.map(invoice => ({
									label: invoice.invoice_unique_id || '',
									value: invoice.id,
									image: ''
								})),
								onSelect: value =>
									setFormData({
										...formData,
										invoice_id: value.toString()
									}),
								showSearch: true,
								placeholder:
									formData.invoice_unique_id || 'Select Invoice',
								inputValue,
								searchtext: 'Search by ID, Name...',
								handleSearch,
								handleLoadMore
							}}
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>
							Transaction Date
						</label>
						<input
							type='date'
							name='transaction_date'
							value={formData.transaction_date || ''}
							onChange={handleChange}
							className='w-full px-3 h-9 border rounded-lg'
							placeholder='Enter Amount'
						/>
					</div>
				</div>

				{/* Paid Amount */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* Payment Method */}
					<div>
						<label className='block text-sm font-medium'>
							Payment Method
						</label>
						<SelectList
							name='payment_method_id'
							options={paymentMethods}
							onChange={handleChange}
							selectedValue={formData.payment_method_id || ''}
							placeholder='Select Payment Method'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium'>
							Amount to be Paid
						</label>
						<input
							type='number'
							name='paid_amount'
							value={formData.paid_amount || ''}
							onChange={handleChange}
							className='w-full px-3 h-9 border rounded-lg'
							placeholder='Enter Amount'
						/>
					</div>
				</div>

				{/* Notes */}
				<div className='grid grid-cols-1  gap-4'>
					<div>
						<label className='block text-sm font-medium'>Notes</label>
						<textarea
							name='notes'
							value={formData.notes || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter any note'
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className='mt-6 text-center'>
					<button
						onClick={handleSubmitTransaction}
						className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default TransactionForm;
