import { lazy, Suspense } from 'react';
const CountUp = lazy(() => import('./CountUp'));

interface ErpDashboardStatsProps extends CountUpProps {
	background: string;
	heading: string;
}

const ErpDashboardStats = ({
	targetNumber,
	duration,
	background,
	heading,
	prefix
}: ErpDashboardStatsProps) => {
	const formattedTargetNumber = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(targetNumber);
	return (
		<Suspense>
			<div
				className={`col-span-1 flex flex-col items-center justify-center w-full h-[40vh] text-2xl font-bold border text-white space-y-3 rounded-xl shadow-xl shadow-[${background}] ${background}`}
			>
				<h2 className='text-white'>{heading}</h2>
				<CountUp {...{ targetNumber, duration, prefix }} />
			</div>
		</Suspense>
	);
};

export default ErpDashboardStats;
