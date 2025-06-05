const DashboardLoader = lazy(
	() => import('@/components/DashboardLoader')
);
import ErpDashboardInfo from '@/components/ErpDashboardInfo';
import ErpDashboardStats from '@/components/ErpDashboardStats';
import { lazy, Suspense, useEffect, useState } from 'react';
import { menuItems } from './menu/main-dashboard-menu-items';

const PageWrapper = lazy(() => import('@/components/PageWrapper'));
type DashboardStats = {
	employees: number;
	departments: number;
	customers: number;
	invoice: number;
	income: number;
};
const MainDashboard = () => {
	const [itemState, setItemState] = useState<DashboardStats>({
		employees: 0,
		departments: 0,
		customers: 0,
		invoice: 0,
		income: 0
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Employee count
				const response = await fetch(
					`${window.zettaSettingsData.api_url}dashboard/count`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-WP-Nonce': window.zettaSettingsData.nonce
						},
						credentials: 'include'
					}
				);
				const data = await response.json();

				setItemState(prev => ({
					...prev,
					employees: data?.total_employees ?? 0,
					departments: data?.total_departments ?? 0,
					customers: data?.total_customers ?? 0,
					invoice: data?.total_invoices ?? 0,
					income: data?.total_income ?? 0
					// expense: data?.total_expenses ?? 0
				}));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	// Define Type for Stats Data
	type StatKey = keyof DashboardStats;

	const statsData: {
		key: StatKey;
		heading: string;
		background: string;
		prefix?: string;
		dynamicClass?: string;
	}[] = [
		{
			key: 'employees',
			heading: 'Employees',
			background: 'bg-sky-400',
			dynamicClass: 'sm:col-span-5 2xl:col-span-4 xl:order-1'
		},
		{
			key: 'departments',
			heading: 'Departments',
			background: 'bg-red-400',
			dynamicClass: 'sm:col-span-6 2xl:col-span-2 xl:order-3'
		},
		{
			key: 'customers',
			heading: 'Customers',
			background: 'bg-teal-400',
			dynamicClass: 'sm:col-span-6 2xl:col-span-3 xl:order-4'
		},
		{
			key: 'invoice',
			heading: 'Invoices',
			background: 'bg-pink-400',
			dynamicClass: 'sm:col-span-8 2xl:col-span-4 xl:order-5'
		},
		{
			key: 'income',
			heading: 'Income',
			background: 'bg-green-400',
			//prefix: '$',
			dynamicClass: 'sm:col-span-4 2xl:col-span-5 xl:order-6'
		}
	];

	return (
		<Suspense>
			<PageWrapper {...{ menuItems, removeMarginTop: false }}>
				<div className='flex flex-col items-center justify-center w-full z-50'>
					<h1 className='text-4xl font-bold mb-4 text-sky-600 py-7'>
						ZETTA ERP
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-12 gap-5 h-full w-full'>
						<div className='sm:col-span-7 2xl:col-span-6 row-span-1 flex flex-col items-center justify-center xl:order-2'>
							<ErpDashboardInfo />
						</div>
						{statsData.map(stat => (
							<div
								key={stat.key}
								className={`flex items-center justify-center ${stat.dynamicClass}`}
							>
								<ErpDashboardStats
									{...{
										targetNumber: itemState[stat.key],
										duration: 900,
										heading: stat.heading,
										background: stat.background,
										prefix: stat.prefix || ''
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default MainDashboard;
