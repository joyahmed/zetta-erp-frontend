import { useHolidaysForm } from '@/components/hooks/useHolidaysForm';
import { lazy } from 'react';
const SelectList = lazy(() => import('@/components/SelectList'));

const HolidayForm = () => {
	const { action, formData, handleChange, handleSubmit, errors } =
		useHolidaysForm();
	return (
		<form className='py-5' onSubmit={handleSubmit}>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create' ? 'Create ' : 'Edit '}Holiday
			</h1>

			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Holiday Name
						</label>
						<input
							{...{
								type: 'text',
								name: 'holiday_name',
								value: formData.holiday_name || '',
								onChange: handleChange,
								placeholder: 'Enter Holiday Name'
							}}
							className='w-full h-9 p-3 border rounded-lg'
						/>
						{errors.holiday_name && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.holiday_name}
							</span>
						)}
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Holiday Type
						</label>
						<SelectList
							{...{
								name: 'holiday_type',
								options: [
									'Govt Holiday',
									'Company Holiday',
									'Observance',
									'Religious Holiday'
								],
								onChange: handleChange,
								selectedValue: formData.holiday_type,
								placeholder: 'Select Holiday Type'
							}}
						/>
						{errors.holiday_type && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.holiday_type}
							</span>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium'>
							Holiday Status
						</label>
						<SelectList
							{...{
								name: 'holiday_status',
								options: ['Approved', 'Pending', 'Cancelled'],
								onChange: handleChange,
								selectedValue: formData.holiday_status,
								placeholder: 'Select Holiday Status'
							}}
						/>
						{errors.holiday_status && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.holiday_status}
							</span>
						)}
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Start Date
						</label>
						<input
							{...{
								type: 'date',
								name: 'start_date',
								value: formData.start_date || '',
								onChange: handleChange,
								placeholder: 'Select Start Date'
							}}
							className='w-full h-9 p-3 border rounded-lg'
						/>
						{errors.start_date && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.start_date}
							</span>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium'>
							End Date
						</label>
						<input
							{...{
								type: 'date',
								name: 'end_date',
								value: formData.end_date || '',
								onChange: handleChange,
								placeholder: 'Select End Date'
							}}
							className='w-full h-9 p-3 border rounded-lg'
						/>
						{errors.end_date && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.end_date}
							</span>
						)}
					</div>
				</div>
				<div className='grid grid-cols-1'>
					<div>
						<label className='block text-sm font-medium'>
							Description
						</label>
						<textarea
							{...{
								type: 'text',
								name: 'description',
								value: formData.description || '',
								onChange: handleChange,
								placeholder: 'Add Holiday Description'
							}}
							className='w-full h-16 p-3 border rounded-lg'
						></textarea>
						{errors.description && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.description}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className='mt-6 text-center'>
				<button className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default HolidayForm;
