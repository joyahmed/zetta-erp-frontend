const DashboardLoader = lazy(
	() => import('@/components/DashboardLoader')
);
import { useGlobal } from '@/context/GlobalContext';
import { lazy, Suspense, useState } from 'react';
import { FaDatabase } from 'react-icons/fa6';
import { ImOffice } from 'react-icons/im';
import { MdOutlineWeekend } from 'react-icons/md';
import { useOrganizationSetting } from './hooks/useOrganizationSettings';
import { menuItems } from './menu/setting-menu-items';
const OrganizationSettingForm = lazy(
	() => import('./OrganizationSettingForm')
);
const WeekendsSettingForm = lazy(
	() => import('./WeekendsSettingForm')
);
const SeedForm = lazy(() => import('./SeedForm'));
const PageWrapper = lazy(() => import('@/components/PageWrapper'));
const SettingsGrid = lazy(() => import('./SettingsGrid'));

const SettingDashboard = () => {
	const { globalState, setGlobalState, toggleModal } = useGlobal();
	const { isOpen } = globalState;
	const [activeItem, setActiveItem] = useState<string>('');
	const { organization } = useOrganizationSetting();
	const settingItems = [
		{
			heading: 'Organization Setting',
			icon: ImOffice,
			modalContent: <OrganizationSettingForm />
		},
		{
			heading: 'Weekends Setting',
			icon: MdOutlineWeekend,
			modalContent: <WeekendsSettingForm />
		},
		{
			heading: 'Seed Dummy Data',
			icon: FaDatabase,
			modalContent: <SeedForm {...{ setGlobalState }} />
		}
	];

	return (
		<Suspense>
			<PageWrapper {...{ menuItems, removeMarginTop: false }}>
				<div className='flex flex-col items-center justify-center min-h-screen w-full py-6'>
					<h1 className='text-2xl md:text-3xl lg:text-4xl text-center  font-bold mb-4 text-sky-600'>
						ZETTA ERP SETTINGS
					</h1>
					{organization ? (
						<div className='flex flex-col items-center justify-center font-semibold text-sky-600 space-y-3 text-lg italic mb-7 '>
							{organization?.company_logo ? (
								<img
									src={organization.company_logo}
									alt='Company Logo'
									className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-md'
								/>
							) : null}
							<h2 className='text-xl font-bold text-sky-600'>
								{organization?.organization_name}
							</h2>
							<div className='flex flex-col sm:flex-row items-center gap-y-3 sm:gap-x-2'>
								<div>Phone: {organization?.phone}</div>
								<div> Email: {organization?.email}</div>
							</div>
							<div className='flex items-center gap-x-2'>
								<div>Address: {organization?.addressline_one} </div>
								<div> {organization?.addressline_two}</div>
							</div>
						</div>
					) : null}
					<div className='w-80 md:w-full '>
						<div className='grid grid-cols-1 md:grid-cols-3 md:h-80 gap-5 '>
							{settingItems.map(item => (
								<SettingsGrid
									key={item.heading}
									{...{
										heading: item.heading,
										icon: item.icon,
										isOpen,
										toggleModal,
										modalContent: item.modalContent,
										activeItem,
										setActiveItem
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default SettingDashboard;
