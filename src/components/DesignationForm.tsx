import { useDesignationForm } from '@/components/hooks/useDesignationForm';
import { lazy } from 'react';

const ComboBox = lazy(() => import('@/components/ComboBox'));

const DesignationForm = () => {
	const {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitDesignation,
		inputValue,
		handleSearch,
		handleLoadMore,
		filteredDepartments,
		errors
	} = useDesignationForm();

	return (
		<div className='py-5'>
			<h1 className='text-2xl font-bold text-sky-600 uppercase text-center mb-6'>
				{action === 'create'
					? 'Create Designation'
					: action === 'edit'
					? 'Edit Designation'
					: 'View Designation'}
			</h1>

			<div className='space-y-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium'>
							Designation Name
						</label>
						<input
							type='text'
							name='designation_name'
							value={formData.designation_name || ''}
							onChange={handleChange}
							className='w-full p-3 border rounded-lg'
							placeholder='Enter Designation Name'
						/>
						{errors.designation_name && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.designation_name}
							</span>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium'>
							Department Name
						</label>
						<ComboBox
							{...{
								options: filteredDepartments.map(dept => ({
									label: dept.department_name || '',
									value: dept.id,
									image: ''
								})),
								onSelect: value =>
									setFormData({
										...formData,
										department_id: value.toString()
									}),
								showSearch: true,
								placeholder:
									formData.department_name || 'Select a Department',
								inputValue,
								searchtext: 'Search by department name...',
								handleSearch,
								handleLoadMore
							}}
						/>
						{errors.department_id && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors.department_id}
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Single Submit Button */}
			<div className='mt-6 text-center'>
				<button
					onClick={handleSubmitDesignation}
					className='w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default DesignationForm;
