const ButtonTooltip = lazy(
	() => import('@/components/ButtonTooltip')
);
const CrudButton = lazy(() => import('@/components/CrudButton'));
import { useInvoiceForm } from '@/components/hooks/useInvoiceForm';
import { lazy } from 'react';
const ComboBox = lazy(() => import('@/components/ComboBox'));

const InvoiceForm = () => {
	// Using the custom hook to manage form state and logic
	const {
		action,
		formData,
		setFormData,
		useTotalDiscount,
		handleChange,
		handleItemChange,
		handleAddItem,
		handleRemoveItem,
		handleSubmitInvoice,
		handleToggleDiscount,
		inputValue,
		handleSearch,
		handleLoadMore,
		filteredCustomers,
		errors,
		invoiceItemsErrors
	} = useInvoiceForm();

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Invoice'
					: action === 'edit'
					? 'Edit Invoice'
					: 'View Invoice'}
			</h1>

			{/* Use Total Discount instead of Item Discount */}
			<div className='mb-4 flex items-center justify-center'>
				<input
					type='checkbox'
					id='toggleDiscount'
					checked={useTotalDiscount}
					onChange={handleToggleDiscount}
					className='mr-2'
				/>
				<label
					htmlFor='toggleDiscount'
					className='text-sm font-medium'
				>
					Use Total Discount instead of Item Discount
				</label>
			</div>

			{/* Customer & Invoice Info */}
			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Customer
						</label>

						<ComboBox
							{...{
								options: filteredCustomers.map(customer => ({
									label: customer.customer_name || '',
									value: customer.id,
									image: ''
								})),
								onSelect: value =>
									setFormData({
										...formData,
										customer_id: value.toString()
									}),
								showSearch: true,
								placeholder:
									formData.customer_name || 'Select a customer',
								inputValue,
								searchtext: 'Search by name, phone, or email...',
								handleSearch,
								handleLoadMore
							}}
						/>
						{errors.customer_id && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.customer_id}
							</span>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium'>
							Due Date
						</label>
						<input
							type='date'
							name='due_date'
							value={formData.due_date}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							required
						/>
					</div>
					{useTotalDiscount ? (
						<div>
							<label className='block text-sm font-medium'>
								Total Discount (%)
							</label>
							<input
								type='text'
								name='total_discount'
								value={
									formData.total_discount === 0
										? ''
										: formData.total_discount
								}
								onChange={handleChange}
								className='w-full p-3 border rounded-lg'
								placeholder='Enter All Items Discount'
							/>
							{errors.total_discount && (
								<span className='text-red-500 text-sm mt-1 block'>
									{errors.total_discount}
								</span>
							)}
						</div>
					) : null}
				</div>
			</div>

			{/* Invoice Items */}
			{formData.invoice_items.map((item, index) => (
				<div key={index} className='space-y-4 mb-4 border-b pb-4'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 shadow rounded-md p-3 mt-2'>
						{['item_name', 'quantity', 'price'].map(field => (
							<div key={field}>
								<label className='block text-sm font-medium'>
									{field
										.replace('_', ' ')
										.replace(/^\w/, c => c.toUpperCase())}
								</label>
								<input
									type='text'
									name={field}
									value={
										(item as any)[field] === 0
											? ''
											: (item as any)[field]
									}
									onChange={e => handleItemChange(index, e)}
									className='w-full p-3 border rounded-lg'
									placeholder={`Enter ${field.replace('_', ' ')}`}
								/>
								{invoiceItemsErrors[`${index}.${field}`] && (
									<span className='text-red-500 text-sm mt-1 block'>
										{invoiceItemsErrors[`${index}.${field}`]}
									</span>
								)}
							</div>
						))}
						{/* Item Discount (only if total discount is not used) */}
						{useTotalDiscount ? null : (
							<div>
								<label className='block text-sm font-medium'>
									Item Discount (%)
								</label>
								<input
									type='text'
									name='item_discount'
									value={item.item_discount || ''}
									onChange={e => handleItemChange(index, e)}
									className='w-full p-3 border rounded-lg'
									placeholder='Enter Discount'
								/>
								{invoiceItemsErrors[`${index}.item_discount`] && (
									<span className='text-red-500 text-sm mt-1 block'>
										{invoiceItemsErrors[`${index}.item_discount`]}
									</span>
								)}
							</div>
						)}
						<div className='col-span-1 sm:col-span-2 flex items-center justify-center w-full'>
							<button
								onClick={() => handleRemoveItem(index)}
								className='relative flex items-center justify-center transition-all duration-100 ease-in-out shadow-lg group'
							>
								<CrudButton {...{ type: 'delete' }} />
								<ButtonTooltip
									{...{ text: 'Remove', path: 'products' }}
								/>
							</button>
						</div>
					</div>
				</div>
			))}

			<div className='flex items-center justify-center w-full mt-2'>
				{errors.invoice_items && (
					<span className='text-red-500 text-sm mt-1 block'>
						{errors.invoice_items}
					</span>
				)}
			</div>

			<div className='flex items-center justify-center w-full'>
				<button
					type='button'
					onClick={handleAddItem}
					className='w-full sm:w-fit px-3 mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition mx-auto'
				>
					Add Invoice Item
				</button>
			</div>

			{/* Single Submit Button */}
			<div className='mt-6 text-center'>
				<button
					onClick={handleSubmitInvoice}
					className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default InvoiceForm;
