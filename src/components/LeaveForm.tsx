import React, { lazy } from 'react';
import { useLeaveForm } from './hooks/useLeaveForm';

const ComboBox = lazy(() => import('@/components/ComboBox'));
const SelectList = lazy(() => import('@/components/SelectList'));

const LeaveForm = () => {
	const {
		action,
		formData,
		setFormData,
		handleChange,
		filteredEmployees,
		inputValue,
		handleSubmit,
		handleSearch,
		handleLoadMore,
		errors
	} = useLeaveForm();

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Leave Request'
					: action === 'edit'
					? 'Edit Leave Request'
					: 'View Leave Request'}
			</h1>

			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{/* Employee */}
					<div>
						<label className='block text-sm font-medium'>
							Employee
						</label>
						<ComboBox
							{...{
								options: filteredEmployees.map(emp => ({
									label: `${emp.first_name} ${emp.last_name}` || '',
									value: emp.id,
									image: emp.employee_avatar || ''
								})),
								onSelect: value =>
									setFormData({
										...formData,
										employee_id: value.toString()
									}),
								showSearch: true,
								placeholder:
									formData.employee_name || 'Select an Employee',
								inputValue,
								searchtext:
									'Search by ID, name, phone, email or dept...',
								handleSearch,
								handleLoadMore
							}}
						/>
						{errors.employee_id && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.employee_id}
							</span>
						)}
					</div>

					{/* Leave Type */}
					<div>
						<label className='block text-sm font-medium'>
							Leave Type
						</label>
						<SelectList
							name='leave_type'
							options={[
								{ label: 'Unpaid Leave', value: 'Unpaid Leave' },
								{ label: 'Paid Leave', value: 'Paid Leave' }
							]}
							selectedValue={formData.leave_type}
							onChange={handleChange}
							placeholder='Select Leave Type'
						/>
						{errors.leave_type && (
							<span className='text-red-500 text-sm'>
								{errors.leave_type}
							</span>
						)}
					</div>

					{/* Start Date */}
					<div>
						<label className='block text-sm font-medium'>
							Start Date
						</label>
						<input
							type='date'
							name='start_date'
							value={formData.start_date || ''}
							onChange={handleChange}
							className='w-full h-9 p-3 border rounded-lg'
							placeholder='Select Start Date'
						/>
						{errors.start_date && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.start_date}
							</span>
						)}
					</div>

					{/* End Date */}
					<div>
						<label className='block text-sm font-medium'>
							End Date
						</label>
						<input
							type='date'
							name='end_date'
							value={formData.end_date || ''}
							onChange={handleChange}
							className='w-full h-9 p-3 border rounded-lg'
							placeholder='Select End Date'
						/>
						{errors.end_date && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.end_date}
							</span>
						)}
					</div>

					{/* Status */}
					<div>
						<label className='block text-sm font-medium'>
							Status
						</label>
						<SelectList
							name='status'
							options={[
								{ label: 'Pending', value: 'Pending' },
								{ label: 'Approved', value: 'Approved' },
								{ label: 'Rejected', value: 'Rejected' }
							]}
							onChange={handleChange}
							selectedValue={formData.status || ''}
							placeholder='Select Status'
						/>
						{errors.status && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.status}
							</span>
						)}
					</div>
				</div>

				{/* Reason */}
				<div>
					<label className='block text-sm font-medium'>Reason</label>
					<textarea
						name='reason'
						value={formData.reason || ''}
						onChange={handleChange}
						className='w-full p-3 border rounded-lg'
						rows={2}
						placeholder='Enter Reason for Leave'
					/>
					{errors.reason && (
						<span className='text-red-500 text-sm mt-1 block'>
							{errors.reason}
						</span>
					)}
				</div>
			</div>

			<div className='mt-6 text-center'>
				<button
					onClick={handleSubmit}
					className='w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default LeaveForm;
