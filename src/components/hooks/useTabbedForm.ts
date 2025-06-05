import { FormEvent, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { toast } from 'react-toastify';

interface UseTabbedFormProps {
	tabItems: {
		id: number;
		title: string;
	}[];
	trigger: UseFormTrigger<any>;
	activeIndex: number;
}

export const useTabbedForm = ({
	tabItems,
	trigger,
	activeIndex
}: UseTabbedFormProps) => {
	const [activeTab, setActiveTab] = useState(activeIndex);

	const handleTabChange = async (newTab: number) => {
		const isValid = await trigger();
		if (!isValid) {
			toast.error(
				`Please fix errors of the current tab
				before moving to any other tab.`
			);
			return;
		}
		setActiveTab(newTab);
	};

	// Find the index of the current active tab
	const activeTabIndex = tabItems.findIndex(
		tab => tab.id === activeTab
	);

	// Navigation handlers
	const handleNextTab = (e: FormEvent) => {
		//	e.preventDefault();
		if (activeTabIndex < tabItems.length - 1) {
			handleTabChange(tabItems[activeTabIndex + 1].id);
		}
	};

	const handlePrevTab = (e: FormEvent) => {
		//e.preventDefault();
		if (activeTabIndex > 0) {
			handleTabChange(tabItems[activeTabIndex - 1].id);
		}
	};

	return {
		activeTab,
		setActiveTab,
		handleTabChange,
		handleNextTab,
		handlePrevTab
	};
};
