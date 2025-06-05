import { lazy } from 'react';
import { useCustomerAddressForm } from './hooks/useCustomerAddressForm';
const ComboBox = lazy(() => import('@/components/ComboBox'));
const SelectList = lazy(() => import('@/components/SelectList'));

const CustomerAddressForm = () => {
	const {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitCustomerAddress,
		filteredCustomers,
		inputValue,
		handleSearch,
		handleLoadMore,
		errors
	} = useCustomerAddressForm();

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Customer Address'
					: action === 'edit'
					? 'Edit Customer Address'
					: 'View Customer Address'}
			</h1>

			{/* Customer Address Fields */}
			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* Customer Selection */}
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
									formData.customer_name || 'Select Customer',
								searchtext: 'Search by name, phone, or email...',
								inputValue,
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

					{/* Address Type */}
					<div>
						<label className='block text-sm font-medium'>
							Address Type
						</label>
						<SelectList
							name='address_type'
							options={[
								{ value: 'Billing', label: 'Billing' },
								{ value: 'Shipping', label: 'Shipping' }
							]}
							onChange={handleChange}
							selectedValue={formData.address_type || ''}
							placeholder='Select Address Type'
						/>
						{errors.address_type && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.address_type}
							</span>
						)}
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* Address Line One */}
					<div>
						<label className='block text-sm font-medium'>
							Address Line One
						</label>
						<input
							type='text'
							name='address_line_1'
							value={formData.address_line_1 || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter Address Line One'
						/>
						{errors.address_line_1 && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.address_line_1}
							</span>
						)}
					</div>
					{/* Address Line Two */}
					<div>
						<label className='block text-sm font-medium'>
							Address Line Two
						</label>
						<input
							type='text'
							name='address_line_2'
							value={formData.address_line_2 || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter Address Line Two'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* State */}
					<div>
						<label className='block text-sm font-medium'>State</label>
						<input
							type='text'
							name='state'
							value={formData.state || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter State'
						/>
						{errors.state && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.state}
							</span>
						)}
					</div>

					{/* Postal Code */}
					<div>
						<label className='block text-sm font-medium'>
							Postal Code
						</label>
						<input
							type='text'
							name='postal_code'
							value={formData.postal_code || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter Postal Code'
						/>
						{errors.postal_code && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.postal_code}
							</span>
						)}
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* City */}
					<div>
						<label className='block text-sm font-medium'>City</label>
						<input
							type='text'
							name='city'
							value={formData.city || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter City'
						/>
						{errors.city && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.city}
							</span>
						)}
					</div>
					{/* Country */}
					<div>
						<label className='block text-sm font-medium'>
							Country
						</label>
						<input
							type='text'
							name='country'
							value={formData.country || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter Country'
						/>
						{errors.country && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.country}
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<div className='mt-6 text-center'>
				<button
					onClick={handleSubmitCustomerAddress}
					className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CustomerAddressForm;
