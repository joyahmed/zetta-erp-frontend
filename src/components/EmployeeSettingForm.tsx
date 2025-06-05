import { lazy } from 'react';
import { useEmployeeFeature } from './hooks/useEmployeeFeature';
const Loader = lazy(() => import('@/components/Loader'));

const EmployeeSettingForm = () => {
	const { loading, error, isEmployeeFeatureEnabled, handleToggle } =
		useEmployeeFeature();
	return (
		<div className='flex flex-col items-center justify-between w-auto h-auto space-y-5'>
			<h3 className='text-2xl text-sky-600 font-bold uppercase'>
				Employee Feature
			</h3>

			{loading ? (
				<Loader />
			) : (
				<div className='text-lg space-y-3'>
					<div className='flex items-center w-full'>
						<label
							htmlFor='employeeToggle'
							className='text-sky-700 font-medium w-full space-x-4'
						>
							<span>Create Employees as WordPress Users</span>
							<input
								type='checkbox'
								id='employeeToggle'
								checked={isEmployeeFeatureEnabled}
								onChange={handleToggle}
								className='w-7 h-7 mt-2'
							/>
						</label>
					</div>
					<p className='text-gray-600 text-lg'>
						The employee feature is currently{' '}
						<span
							className={`font-bold italic ${
								isEmployeeFeatureEnabled
									? 'text-green-600'
									: 'text-red-600'
							}`}
						>
							{isEmployeeFeatureEnabled ? 'Enabled' : 'Disabled'}
						</span>
						.
					</p>
				</div>
			)}
		</div>
	);
};

export default EmployeeSettingForm;
