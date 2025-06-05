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
}

const SettingsGrid = ({
	icon: Icon,
	heading,
	modalContent,
	link,
	isOpen,
	toggleModal,
	activeItem,
	setActiveItem
}: SettingGridProps) => {
	const handleActive = () => {
		setActiveItem(heading);
		toggleModal();
	};
	return (
		<>
			{modalContent ? (
				<div
					className='col-span-1 flex flex-col items-center justify-center w-full h-full rounded-xl bg-sky-500 text-xl font-bold text-white shadow-xl gap-3 cursor-pointer hover:scale-[101%] transition py-8 md:py-0'
					onClick={handleActive}
				>
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
