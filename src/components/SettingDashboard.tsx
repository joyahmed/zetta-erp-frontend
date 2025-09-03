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
	const [isSeedEnabled, setIsSeedEnabled] = useState(false);

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
						<div className='flex flex-col items-center justify-center font-semibold text-sky-600 space-y-3 text-lg italic mb-7 shadow p-4 rounded-md w-full max-w-screen-md'>
							{organization?.company_logo ? (
								<img
									src={organization.company_logo}
									alt='Company Logo'
									className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-md'
								/>
							) : null}
							<h2 className='text-xl text-center font-bold text-sky-600'>
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
							<div className='flex flex-col sm:flex-row items-center gap-y-3 sm:gap-x-2'>
								<div>
									{organization?.allowed_ip && (
										<div className='text-sm text-sky-600'>
											🔐 Organization IP:{' '}
											<span className='font-mono'>
												{organization?.allowed_ip}
											</span>
										</div>
									)}
								</div>
								<div>
									{organization?.office_checkin_time &&
										organization?.office_checkout_time && (
											<div className='text-sm text-sky-600'>
												🏢 Office Time:{' '}
												<span className='font-mono'>
													{organization?.office_checkin_time} -{' '}
													{organization?.office_checkout_time}
												</span>
											</div>
										)}
									{organization?.grace_minutes !== undefined && (
										<div className='text-sm text-sky-600'>
											⏱ Grace Time:{' '}
											<span className='font-mono'>
												{organization.grace_minutes} Minute
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					) : null}
					<div className='w-80 md:w-full'>
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
										setActiveItem,
										disabled:
											item.heading === 'Seed Dummy Data' &&
											!isSeedEnabled,
										isSeedEnabled:
											item.heading === 'Seed Dummy Data'
												? isSeedEnabled
												: undefined,
										setIsSeedEnabled:
											item.heading === 'Seed Dummy Data'
												? setIsSeedEnabled
												: undefined
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
