import { useMediaUploaderWithForm } from '@/components/hooks/useMediaUploaderWithForm';
import { useTabbedForm } from '@/components/hooks/useTabbedForm';
import { useGlobal } from '@/context/GlobalContext';
import { HEADERS } from '@/utils/get-headers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	organizationFormFields,
	organizationSettingTabs
} from '../../utils/organizationSettingFormItems';
import { useHandleSubmit } from './useHandleSubmit';

interface OrganizationProps {
	id: number;
	organization_name: string;
	addressline_one: string;
	addressline_two: string;
	phone: string;
	email: string;
	company_logo: string;
}

export const useOrganizationSetting = () => {
	const {
		globalState: { id, action, fetchInitialData },
		setGlobalState
	} = useGlobal();
	const [organization, setOrganization] =
		useState<OrganizationProps>();

	// Form State
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onSubmit', // Validate on submit
		reValidateMode: 'onChange', // Re-validate on change
		shouldFocusError: true // Focus on the first error field
	});

	const { handleTabChange, handleNextTab, handlePrevTab, activeTab } =
		useTabbedForm({
			tabItems: organizationSettingTabs,
			trigger,
			activeIndex: 1
		});

	const fetchData = async () => {
		try {
			const result = await fetch(
				`${window.zettaSettingsData.api_url}setting/organization`,
				{
					method: 'GET',
					headers: HEADERS,
					credentials: 'include'
				}
			);
			const data = await result.json();
			if (data?.success) {
				setOrganization(data?.data);
				setGlobalState(prev => ({
					...prev,
					id: data?.data.id
				}));
				return { data };
			}
		} catch (error) {
			console.error('Error fetching employees:', error);
			return undefined;
		}
	};

	useEffect(() => {
		if (organization) {
			(
				Object.keys(organization) as Array<keyof OrganizationProps>
			).forEach(key => {
				setValue(key, organization[key]);
			});
		}
	}, [organization, setValue]);

	const showSubmitCondition =
		action === 'create'
			? activeTab === organizationSettingTabs.length
			: true;

	const submitUrl = !organization
		? `${window.zettaSettingsData.api_url}setting/organization`
		: `${window.zettaSettingsData.api_url}setting/organization/edit/${id}`;

	const formData = getValues();

	const { onSubmit } = useHandleSubmit({
		submitUrl,
		method: !organization ? 'POST' : 'PUT',
		formData,
		page: 'zetta_erp_setting'
	});

	// Find the index of the current active tab
	const activeTabIndex = organizationSettingTabs.findIndex(
		tab => tab.id === activeTab
	);

	// Media Upload
	const { openMediaUploader } = useMediaUploaderWithForm(
		watch,
		setValue
	);

	useEffect(() => {
		fetchData();
	}, [fetchInitialData]);

	return {
		organization,
		action,
		organizationSettingTabs,
		activeTab,
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
		handleTabChange,
		handleNextTab,
		handlePrevTab
	};
};
