import { lazy } from 'react';
const Loader = lazy(() => import('./Loader'));

const DashboardLoader = () => {
	return (
		<div className='flex items-center justify-center h-screen w-full'>
			<Loader />
		</div>
	);
};

export default DashboardLoader;
