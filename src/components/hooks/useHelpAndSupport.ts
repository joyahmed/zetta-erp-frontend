
import {  useEffect, useState } from 'react';

export const useHelpAndSupport = () => {
	const [isModalOpen, setModalOpen] = useState(true);
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


	const imageUrl =
		(window.zettaSettingsData?.assets_url || '') + 'zetta-erp.webp';

	return {
		isModalOpen,
		handleCloseModal,
		imageUrl,
		setActiveTab,
		activeTab,
		modalRoot
	};
};
