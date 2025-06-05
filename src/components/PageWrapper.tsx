const Navbar = lazy(() => import('@/components/Navbar'));
import React, { lazy } from 'react';

interface PageWrapperProps {
	children: React.ReactNode;
	menuItems: MenuItem[];
	removeMarginTop?: boolean;
}

const PageWrapper = ({
	children,
	menuItems,
	removeMarginTop = true
}: PageWrapperProps) => {
	return (
		<div className='flex flex-col items-center  w-full min-h-fit pr-3 lg:pr-5 z-50'>
			<Navbar {...{ menuItems }} />
			<div
				className={`flex flex-col items-center h-auto w-full z-40 ${
					removeMarginTop ? 'mt-[2rem]' : ''
				}`}
			>
				{children}
			</div>
		</div>
	);
};

export default PageWrapper;
