const DashboardLoader = lazy(
	() => import('@/components/DashboardLoader')
);
import { lazy, Suspense } from 'react';
import { menuItems } from './menu/crm-menu-items';
const DashboardDataComponent = lazy(
	() => import('@/components/DashboardDataComponent')
);
const CustomerGrowthChart = lazy(
	() => import('./CustomerGrowthChart')
);
const CustomersByCityChart = lazy(
	() => import('./CustomersByCityChart')
);
const CustomersByCountryChart = lazy(
	() => import('./CustomersByCountry')
);
const PageWrapper = lazy(() => import('@/components/PageWrapper'));

const MainCrmDashboard = () => {
	const itemsArray = [
		{
			text: 'Customer Growth',
			children: <CustomerGrowthChart />,
			colspan: 'col-span-2'
		},
		{
			text: 'Customer by City',
			children: <CustomersByCityChart />,
			colspan: 'col-span-2'
		},
		{
			text: 'Customers by Country',
			children: <CustomersByCountryChart />,
			colspan: 'col-span-2'
		}
	];

	return (
		<Suspense>
			<PageWrapper {...{ menuItems }}>
				<div className='flex flex-col items-center justify-center h-full w-full'>
					<h1 className='text-2xl md:text-4xl font-bold mb-6 text-sky-600'>
						CRM Dashboard
					</h1>

					<div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-5 w-full'>
						{itemsArray.map(item => (
							<DashboardDataComponent
								key={item.text}
								{...{
									text: item.text,
									children: item.children,
									colspan: item.colspan
								}}
							/>
						))}
					</div>
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default MainCrmDashboard;
