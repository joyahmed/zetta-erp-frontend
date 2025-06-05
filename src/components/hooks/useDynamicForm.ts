import { useGlobal } from '@/context/GlobalContext';
import { FormEvent, useEffect, useState } from 'react';
import { useHandleSubmit } from './useHandleSubmit';

export interface FieldConfig {
	label: string;
	type: string;
	name: string;
	accept?: string;
	required?: boolean;
}

interface FormData {
	[key: string]: string | number | undefined;
}

export const useDynamicForm = (
	initialFields: FieldConfig[],
	fetchUrl: string,
	submitUrl: string,
	page: string,
	formName?: string
) => {
	const { globalState } = useGlobal();
	const { action, id } = globalState;
	const [formData, setFormData] = useState<FormData>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [fields, setFields] = useState<FieldConfig[]>(initialFields);

	// Fetch items from the API
	const fetchItem = async () => {
		try {
			const response = await fetch(fetchUrl, {
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce // Ensure nonce is passed
				},
				credentials: 'include'
			});
			const data = await response.json();
			{
				formName ? setFormData(data.department) : setFormData(data);
			}
		} catch (error) {
			console.error('Error fetching items:', error);
		}
	};

	// Handles the form field changes
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Form validation
	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};
		const requiredFields = fields.filter(field => field.required);

		requiredFields.forEach(field => {
			if (!formData[field.name]) {
				validationErrors[field.name] = `${field.label} is required.`;
			}
		});

		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const { onSubmit } = useHandleSubmit({
		submitUrl,
		method: action === 'create' ? 'POST' : 'PUT',
		formData,
		page
	});

	useEffect(() => {
		if (id && id !== 0) {
			fetchItem();
		}
	}, [id]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit();
		}
	};

	return {
		formData,
		setFormData,
		fields,
		setFields,
		handleChange,
		handleSubmit,
		validateForm,
		errors
	};
};
