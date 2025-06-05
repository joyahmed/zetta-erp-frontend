import { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const Modal = lazy(() => import('../Modal'));
const Faq = lazy(() => import('./Faq'));
const UpcommingFeatures = lazy(() => import('./UpcommingFeatures'));
const Description = lazy(() => import('./Description'));
const PluginInfoPanel = lazy(() => import('./PluginInfoPanel'));
const SetupGuide = lazy(() => import('./SetupGuide'));


const HelpAndSupport = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('description');

	const handleOpenModal = (event: Event) => {
		event.preventDefault();
		setModalOpen(true);
	};

	const handleCloseModal = () => setModalOpen(false);

	useEffect(() => {
		const helpLink = document.getElementById('zetta-erp-help-link');

		if (helpLink) {
			helpLink.addEventListener('click', handleOpenModal);
		}

		return () => {
			if (helpLink) {
				helpLink.removeEventListener('click', handleOpenModal);
			}
		};
	}, []);

	const modalRoot = document.getElementById('zetta-erp-modal-root');
	if (!modalRoot) return null;

	const tabs = [
		{
			id: 'description',
			label: 'Description',
			content: <Description />
		},
		{
			id: 'setup',
			label: 'Setup Guide',
			content: <SetupGuide />
		},
		{ id: 'faq', label: 'FAQ', content: <Faq /> },
		{
			id: 'upcomming',
			label: 'Upcoming Features',
			content: <UpcommingFeatures />
		}
	];

	const imageUrl =
		(window.zettaSettingsData?.assets_url || '') + 'zetta-erp.webp';

	return ReactDOM.createPortal(
		<Suspense>
			<Modal
				{...{
					isOpen: isModalOpen,
					onClose: handleCloseModal,
					dynamicClass: 'mt-0'
				}}
			>
				<div
					className='flex flex-col w-full min-w-fit sm:min-w-[80vw] lg:min-w-[800px] lg:w-[800px] min-h-screen md:h-full text-gray-800 -mt-5 md:mt-0'
					onClick={e => e.stopPropagation()}
				>
					{/* Header */}
					<div
						className='flex items-center gap-4 w-full min-h-[10rem] md:min-h-[15rem]'
						style={{
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
					></div>

					{/* Tabs - Sticky at the top */}
					<div className='sticky top-0 flex flex-wrap justify-between md:gap-4 border-b border-b-green-500 py-2'>
						{tabs.map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`scale-[80%] sm:scale-100 w-[48%] md:w-[23.5%] px-2 md:px-4 py-2 font-medium rounded-md transition-all duration-200 ease-linear ${
									activeTab === tab.id
										? 'bg-green-500 hover:bg-green-600 text-white scale-105'
										: 'bg-gray-300 text-sky-600 hover:bg-gray-400 hover:text-white'
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Content Wrapper */}
					<div className='flex flex-col md:flex-row flex-grow overflow-y-auto overflow-hidden no-scrollbar'>
						{/* Main Content - left */}
						<div className='flex-1 p-4 '>
							{tabs.map(tab => (
								<div
									key={tab.id}
									className={
										activeTab === tab.id ? 'block' : 'hidden'
									}
								>
									{tab.content}
								</div>
							))}
						</div>

						{/* PluginInfoPanel  content - right */}
						<div className='w-full md:w-64 pl-4'>
							<PluginInfoPanel />
						</div>
					</div>
				</div>
			</Modal>
		</Suspense>,
		modalRoot
	);
};

export default HelpAndSupport;
