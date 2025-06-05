import { GlobalStateType } from '@/context/GlobalContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface SeedFormProps {
	setGlobalState: React.Dispatch<
		React.SetStateAction<GlobalStateType>
	>;
}

const SeedForm = ({ setGlobalState }: SeedFormProps) => {
	const [loading, setLoading] = useState({
		department: false,
		employee: false,
		'customer-and-address': false,
		'payment-method': false,
		attendance: false,
		invoice: false,
		holidays: false
	});

	const handleSeed = async (endpoint: string, type: string) => {
		setLoading(prev => ({ ...prev, [type]: true }));
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}${endpoint}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const data = await response.json();

			if (data?.success) {
				toast.success(data.message);
				setTimeout(
					() =>
						setGlobalState(prev => ({
							...prev,
							isOpen: false
						})),
					2000
				);
			} else {
				toast.error(data.message);
			}
		} catch (error: any) {
			toast.error(`Error: ${error?.message}`);
		} finally {
			setLoading(prev => ({ ...prev, [type]: false }));
		}
	};

	return (
		<div className='flex flex-col items-center w-full p-6 border rounded-lg shadow-md space-y-5 h-auto'>
			<h3 className='text-2xl text-sky-600 font-bold uppercase'>
				Seed with Dummy Data
			</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 h-full w-full gap-5 p-3'>
				<button
					onClick={() =>
						handleSeed(
							'hrm/v1/seed-department-designation',
							'department'
						)
					}
					disabled={loading.department}
					className='col-span-1 bg-sky-600 text-white w-full h-12 px-3 rounded-md hover:bg-sky-700 transition mb-3 font-bold'
				>
					{loading.department
						? 'Seeding Departments...'
						: 'Seed Departments & Designations'}
				</button>
				<button
					onClick={() =>
						handleSeed('hrm/v1/seed-employee', 'employee')
					}
					disabled={loading.employee}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading.employee
						? 'Seeding Employees...'
						: 'Seed Employees'}
				</button>
				<button
					onClick={() =>
						handleSeed('hrm/v1/seed-attendance', 'attendance')
					}
					disabled={loading['attendance']}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading['attendance']
						? 'Seeding Attendance...'
						: 'Seed Attendance'}
				</button>
				<button
					onClick={() =>
						handleSeed('hrm/v1/seed-holidays', 'holidays')
					}
					disabled={loading['holidays']}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading['holidays']
						? 'Seeding Holidays...'
						: 'Seed Holidays'}
				</button>
				<button
					onClick={() =>
						handleSeed(
							'crm/v1/seed-customer-and-address',
							'customer-and-address'
						)
					}
					disabled={loading['customer-and-address']}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading['customer-and-address']
						? 'Seeding Customer and Address...'
						: 'Seed Customer and Address'}
				</button>
				<button
					onClick={() =>
						handleSeed(
							'accounts/v1/seed-payment-methods',
							'payment-method'
						)
					}
					disabled={loading['payment-method']}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading['payment-method']
						? 'Seeding Payment Methods...'
						: 'Seed Payment Methods'}
				</button>
				<button
					onClick={() =>
						handleSeed('accounts/v1/seed-invoice', 'invoice')
					}
					disabled={loading['invoice']}
					className='col-span-1 bg-sky-600 text-white w-full  h-12 px-3 rounded-md hover:bg-sky-700 transition font-bold'
				>
					{loading['invoice']
						? 'Seeding Invoices...'
						: 'Seed Invoices'}
				</button>
			</div>
		</div>
	);
};

export default SeedForm;
