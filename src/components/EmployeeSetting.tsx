import { useEmployeeFeature } from '@/components/hooks/useEmployeeFeature';

const EmployeeSetting = () => {
	const { loading, error, isEmployeeFeatureEnabled, handleToggle } =
		useEmployeeFeature();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='p-4 rounded shadow-xl space-y-5 w-full'>
			{error && <p className='text-red-500 mb-5'>{error}</p>}
			<div className='flex flex-col items-center space-y-5'>
				<h3 className='text-xl text-sky-800 font-bold'>
					Employee Feature
				</h3>
				<div className='flex items-center space-x-4 w-full'>
					<label
						htmlFor='employeeToggle'
						className='text-sky-700 font-medium w-full'
					>
						Create Employees as WordPress Users
					</label>
					<input
						type='checkbox'
						id='employeeToggle'
						checked={isEmployeeFeatureEnabled}
						onChange={handleToggle}
						className='w-6 h-6'
					/>
				</div>
			</div>
			<p className='text-gray-600'>
				The employee feature is currently{' '}
				<span className='font-bold'>
					{isEmployeeFeatureEnabled ? 'Enabled' : 'Disabled'}
				</span>
				.
			</p>
		</div>
	);
};

export default EmployeeSetting;
