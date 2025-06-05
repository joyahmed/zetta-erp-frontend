import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { HEADERS } from '@/utils/get-headers';
import { makeUpperCase } from '@/utils/makeUpperCase';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useHolidaysForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [formData, setFormData] = useState({
		holiday_name: '',
		holiday_type: '',
		holiday_status: '',
		start_date: '',
		end_date: '',
		description: ''
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: '' }));
	};

	const fetchHoliday = async () => {
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}hrm/holiday/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const data = await response.json();
			if (data?.success) {
				const {
					holiday_name,
					holiday_type,
					holiday_status,
					start_date,
					end_date,
					description
				} = data?.data;

				setFormData({
					holiday_name: holiday_name,
					holiday_type: holiday_type,
					holiday_status: holiday_status,
					start_date: start_date,
					end_date: end_date,
					description: description
				});
			}
		} catch (error) {
			console.error('Error fetching departments:', error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchHoliday();
		}
	}, [id]);

	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};

		if (!formData.holiday_name.trim()) {
			validationErrors.holiday_name = 'Holiday name is required.';
		}

		if (!formData.holiday_type) {
			validationErrors.holiday_type = 'Holiday type is required.';
		}
		if (!formData.holiday_status) {
			validationErrors.holiday_status = 'Holiday status is required.';
		}
		if (!formData.start_date) {
			validationErrors.start_date = 'Start date is required.';
		}
		if (!formData.end_date) {
			validationErrors.end_date = 'End date is required.';
		}
		if (!formData.description) {
			validationErrors.description = 'Description is required.';
		}

		setErrors(validationErrors);

		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}hrm/holiday`
				: `${window.zettaSettingsData.api_url}hrm/holiday/edit/${id}`;

		try {
			const response = await fetch(submitUrl, {
				method: action === 'create' ? 'POST' : 'PUT',
				headers: HEADERS,
				body: JSON.stringify(formData)
			});

			const data = await response.json();
			if (data?.success) {
				toast.success(
					data.message || 'Holiday submitted successfully!'
				);
				handleResetTableData();
			} else {
				if (data?.errors && typeof data.errors === 'object') {
					Object.values(data.errors).forEach((err: any) =>
						toast.error(makeUpperCase(err))
					);
				} else {
					toast.error(
						makeUpperCase(data.message || 'Error submitting holiday.')
					);
				}
			}
		} catch (error) {
			toast.error('Error submitting holiday. Please try again.');
		}
	};

	return {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmit,
		errors
	};
};
