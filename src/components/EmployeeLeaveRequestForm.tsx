import { lazy } from 'react';
import { useEmployeeLeaveForm } from './hooks/useEmployeeLeaveForm';

const SelectList = lazy(() => import('@/components/SelectList'));

const EmployeeLeaveRequestForm = () => {
	const { formData, handleChange, handleSubmit, errors } =
		useEmployeeLeaveForm();

	return (
		<div className='py-6'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				Create Leave Request
			</h1>

			<div className='space-y-4'>
				{/* start & end dates */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Start Date
						</label>
						<input
							type='date'
							name='start_date'
							value={formData.start_date}
							onChange={handleChange}
							className='w-full h-9 p-3 border rounded-lg'
						/>
						{errors.start_date && (
							<span className='text-red-500 text-sm'>
								{errors.start_date}
							</span>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium'>
							End Date
						</label>
						<input
							type='date'
							name='end_date'
							value={formData.end_date}
							onChange={handleChange}
							className='w-full h-9 p-3 border rounded-lg'
						/>
						{errors.end_date && (
							<span className='text-red-500 text-sm'>
								{errors.end_date}
							</span>
						)}
					</div>
				</div>

				{/* leave type */}
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

				{/* reason */}
				<div>
					<label className='block text-sm font-medium'>Reason</label>
					<textarea
						name='reason'
						value={formData.reason}
						onChange={handleChange}
						rows={2}
						className='w-full p-3 border rounded-lg'
						placeholder='Enter reason for leave'
					/>
					{errors.reason && (
						<span className='text-red-500 text-sm'>
							{errors.reason}
						</span>
					)}
				</div>
			</div>

			<button
				onClick={handleSubmit}
				className='w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
			>
				Submit
			</button>
		</div>
	);
};

export default EmployeeLeaveRequestForm;
