import { useAttendanceForm } from '@/components/hooks/useAttendanceFrom';
import { lazy } from 'react';

const ComboBox = lazy(() => import('@/components/ComboBox'));
const SelectList = lazy(() => import('@/components/SelectList'));

const AttendanceForm = () => {
	const {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitAttendance,
		filteredEmployees,
		inputValue,
		handleSearch,
		handleLoadMore,
		errors
	} = useAttendanceForm();

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Attendance'
					: action === 'edit'
					? 'Edit Attendance'
					: 'View Attendance'}
			</h1>

			{/* Attendance Fields */}
			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Attendance Date
						</label>
						<input
							type='date'
							name='attendance_date'
							value={formData.attendance_date || ''}
							onChange={handleChange}
							className='w-full h-9 p-3 border rounded-lg'
							placeholder='Select Date'
						/>
						{errors.attendance_date && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.attendance_date}
							</span>
						)}
					</div>

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
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Attendance Status
						</label>
						<SelectList
							name='status'
							options={[
								{ label: 'Present', value: 'Present' },
								{ label: 'Absent', value: 'Absent' },
								{ label: 'Leave', value: 'Leave' }
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
				{formData.status === 'Present' ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium'>
								Check-In Time
							</label>
							<input
								type='time'
								name='check_in_time'
								value={formData.check_in_time || ''}
								onChange={handleChange}
								className='w-full p-3 border rounded-lg'
								placeholder='Enter Check-In Time'
							/>
							{errors.check_in_time && (
								<span className='text-red-500 text-sm mt-1 block'>
									{errors.check_in_time}
								</span>
							)}
						</div>

						<div>
							<label className='block text-sm font-medium'>
								Check-Out Time
							</label>
							<input
								type='time'
								name='check_out_time'
								value={formData.check_out_time || ''}
								onChange={handleChange}
								className='w-full p-3 border rounded-lg'
								placeholder='Enter Check-Out Time'
							/>
							{errors.check_out_time && (
								<span className='text-red-500 text-sm mt-1 block'>
									{errors.check_out_time}
								</span>
							)}
						</div>
					</div>
				) : null}
			</div>

			{/* Submit Button */}
			<div className='mt-6 text-center'>
				<button
					onClick={handleSubmitAttendance}
					className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default AttendanceForm;
