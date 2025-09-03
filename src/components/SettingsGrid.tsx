import { lazy } from 'react';

import { IconType } from 'react-icons';
const Modal = lazy(() => import('./Modal'));

interface SettingGridProps {
	icon: IconType;
	heading: string;
	modalContent?: React.ReactNode;
	link?: string;
	isOpen: boolean;
	toggleModal: () => void;
	activeItem: string;
	setActiveItem: React.Dispatch<React.SetStateAction<string>>;
	disabled?: boolean;
	isSeedEnabled?: boolean;
	setIsSeedEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsGrid = ({
	icon: Icon,
	heading,
	modalContent,
	link,
	isOpen,
	toggleModal,
	activeItem,
	setActiveItem,
	disabled = false,
	isSeedEnabled,
	setIsSeedEnabled
}: SettingGridProps) => {
	const handleActive = () => {
		if (disabled) return;
		setActiveItem(heading);
		toggleModal();
	};
	return (
		<>
			{modalContent ? (
				<div
					className={`relative col-span-1 flex flex-col items-center justify-center w-full h-full rounded-xl text-xl font-bold gap-3 transition py-8 md:py-0 ${
						disabled
							? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
							: 'bg-sky-500 text-white shadow-xl hover:scale-[101%] cursor-pointer'
					}`}
					onClick={handleActive}
				>
					{heading === 'Seed Dummy Data' &&
						setIsSeedEnabled &&
						typeof isSeedEnabled === 'boolean' && (
							<div className='absolute top-2 right-2 flex items-center gap-2'>
								<span className='text-sm font-semibold text-white'>
									{isSeedEnabled
										? 'Deactivate Seeding'
										: 'Activate Seeding'}
								</span>
								<button
									onClick={e => {
										e.stopPropagation();
										setIsSeedEnabled(!isSeedEnabled);
									}}
									className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-2xl ${
										isSeedEnabled ? 'bg-red-500' : 'bg-green-500'
									}`}
								>
									<span
										className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
											isSeedEnabled
												? 'translate-x-6'
												: 'translate-x-1'
										}`}
									/>
								</button>
							</div>
						)}

					<Icon className='w-8 md:w-10 h-8 md:h-10' />
					{heading}
				</div>
			) : (
				<a
					href={`${window.zettaSettingsData.admin_url}${link}`}
					className='col-span-1 flex flex-col items-center justify-center w-full h-full rounded-xl bg-sky-500 text-xl font-bold text-white shadow-xl gap-3 cursor-pointer hover:text-white hover:scale-[101%] transition py-8 md:py-0'
				>
					<Icon className='w-8 md:w-10 h-8 md:h-10' />
					{heading}
				</a>
			)}
			{activeItem === heading ? (
				<Modal
					{...{
						isOpen,
						onClose: toggleModal,
						dynamicClass: '',
						dynamicClassTwo: ''
					}}
				>
					{modalContent}
				</Modal>
			) : null}
		</>
	);
};

export default SettingsGrid;
