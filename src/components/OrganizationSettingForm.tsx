import { lazy } from 'react';
import { useOrganizationSetting } from './hooks/useOrganizationSettings';
const TabbedForm = lazy(() => import('@/components/TabbedForm'));

const OrganizationSettingForm = () => {
	const {
		action,
		organizationSettingTabs,
		activeTab,
		handleTabChange,
		handleSubmit,
		onSubmit,
		organizationFormFields,
		register,
		openMediaUploader,
		watch,
		setValue,
		showSubmitCondition,
		errors,
		activeTabIndex,
		handleNextTab,
		handlePrevTab
	} = useOrganizationSetting();
	return (
		<TabbedForm
			{...{
				heading: 'Organization Setting',
				action,
				tabItems: organizationSettingTabs,
				activeTab,
				handleTabChange,
				handleSubmit,
				onSubmit,
				fieldItems: organizationFormFields,
				uploadableFields: ['company_logo'],
				setValue,
				register,
				openMediaUploader,
				watch,
				errors,
				handlePrevTab,
				handleNextTab,
				activeTabIndex,
				tabsLength: organizationSettingTabs.length,
				showSubmitCondition,
				outerHeight: 'min-h-[12rem]',
				innerHeight: 'min-h-[10rem]',
				cols: 'grid-cols-1 lg:grid-cols-2',
				textareaRows: 2
			}}
		/>
	);
};

export default OrganizationSettingForm;
