import PageWrapper from '@/components/PageWrapper';
import { formatDate } from '@/utils/format-date';
import { HEADERS } from '@/utils/get-headers';
import { Suspense, useEffect, useState } from 'react';
import { menuItems } from './menu/hrm-menu-items';

const Profile = () => {
	const [user, setUser] = useState<EmployeeProps>();
	const userId = window.zettaSettingsData.current_user_id;

	// if you are not an employee you won't see any profile so use any wp_user_id from db instead of ${userId} to check how it looks or log in as an employee

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const apiUrl = `${window.zettaSettingsData.api_url}people/profile/${userId}`;

			try {
				const response = await fetch(apiUrl, {
					method: 'GET',
					headers: HEADERS,
					credentials: 'include'
				});

				if (!response.ok) {
					throw new Error(`Error: '${response.statusText}`);
				}

				const result = await response.json();
				if (result) {
					setUser(result);
				}
			} catch (error: any) {}
		};

		fetchCurrentUser();
	}, []);

	const employeeFields = [
		{ label: 'Employee ID', value: user?.employee_unique_id },
		{
			label: 'Department',
			value: user?.department_name || 'N/A'
		},
		{ label: 'Designation', value: user?.designation_name || 'N/A' },
		{
			label: 'Overtime Status',
			value: user?.overtime_status || 'N/A'
		},
		{
			label: 'Date of Birth',
			value: user?.date_of_birth
				? formatDate(user.date_of_birth)
				: 'N/A'
		},
		{ label: 'Gender', value: user?.gender || 'N/A' },
		{ label: 'Marital Status', value: user?.marital_status || 'N/A' },
		{ label: 'NID', value: user?.nid_number || 'N/A' },
		{ label: 'Phone', value: user?.phone_number || 'N/A' },
		{ label: 'Email', value: user?.email || 'N/A' },
		{
			label: 'Date of Joining',
			value: user?.date_of_joining
				? formatDate(user.date_of_joining)
				: 'N/A'
		},
		{
			label: 'Salary',
			value: user?.salary ? `${user.salary}` : 'N/A'
		},

		{
			label: 'Present Address',
			value: user?.present_address || 'N/A'
		},
		{
			label: 'Parmanent Address',
			value: user?.permanent_address
		}
	];

	return (
		<Suspense>
			<PageWrapper {...{ menuItems }}>
				<div className='flex items-center justify-center h-full min-h-[70dvh] w-full '>
					{user ? (
						<div className='flex flex-col items-center justify-center h-full w-full space-y-7'>
							<h1 className='text-2xl lg:text-4xl text-sky-600 font-bold'>
								{`${user?.first_name}'s Profile`}
							</h1>
							<div className='flex flex-col items-center justify-center h-auto w-full sm:w-fit shadow-xl text-sky-600 p-5 rounded-xl space-y-5'>
								<div className='flex items-center justify-center h-auto w-auto p-5 rounded-full shadow-xl bg-gradient-to-b from-white/50 via-sky-50/50 to-gray-50/50 hover:scale-105 transition'>
									<img
										src={user?.employee_avatar}
										alt={user?.first_name}
										width={200}
										height={200}
										className='w-32 h-32 lg:w-[10dvw] lg:h-[10dvw] object-cover rounded-full shadow'
									/>
								</div>
								<div className='sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left space-y-2'>
									<h3 className='text-2xl lg:text-3xl font-bold text-gray-900'>
										{user?.first_name} {user?.last_name}
									</h3>
									<p className='text-white text-[17px] text-center font-bold bg-sky-400 rounded-full w-40 mx-auto py-2'>
										{user?.employment_status}
									</p>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl'>
									{employeeFields.map((field, index) => (
										<div
											key={index}
											className='p-4 border rounded-lg shadow-md flex flex-col hover:scale-[101%] transition'
										>
											<span className='text-[17px] font-semibold text-gray-700'>
												{field.label}
											</span>
											<span className='text-gray-900 text-base mt-1'>
												{field.value || 'N/A'}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className='flex items-center justify-center h-full min-h-[70dvh]  text-red-600 text-3xl font-bold my-auto whitespace-pre-line text-center'>
							{`BAM! Your data not found!

							Either you're not an employee or you are not logged in!
							`}
						</div>
					)}
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default Profile;
