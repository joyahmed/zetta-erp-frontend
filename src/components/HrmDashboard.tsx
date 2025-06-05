const PageWrapper = lazy(() => import('@/components/PageWrapper'));
const DashboardDataComponent = lazy(
	() => import('@/components/DashboardDataComponent')
);

import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip
} from 'chart.js';
import { lazy, Suspense } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Calendar from './Calendar';
import { useHrmDashboard } from './hooks/useHrmDashboard';
import { menuItems } from './menu/hrm-menu-items';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title
);

const HrmDashboard = () => {
	const {
		departmentChartData,
		dashboardData,
		designationChartData,
		attendanceChartData
	} = useHrmDashboard();

	const itemsArray = [
		{
			text: 'Employees Per Department',
			children: <Pie data={departmentChartData} />,
			colspan: 'col-span-2'
		},
		{
			text: 'Attendance Summary (Last 7 Days)',
			children: (
				<Bar
					key={dashboardData?.attendance.length}
					data={attendanceChartData}
				/>
			),
			colspan: 'col-span-2'
		},
		{
			text: 'Employees Per Designation',
			children: <Pie data={designationChartData} />,
			colspan: 'col-span-2'
		}
	];

	return (
		<Suspense>
			<PageWrapper {...{ menuItems }}>
				<div className='flex flex-col items-center justify-center h-full w-full'>
					<h1 className='text-2xl md:text-4xl font-bold mb-6 text-sky-600'>
						HRM Dashboard
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

					<h3 className='text-xl font-semibold mt-5 text-sky-600'>
						Holidays
					</h3>
					<div className='w-full no-scrollbar'>
						<Calendar />
					</div>
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default HrmDashboard;
