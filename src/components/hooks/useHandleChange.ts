import { ChangeEvent } from 'react';

export function useHandleChange<T extends Record<string, any>>() {
	const handleChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
		setFormData: React.Dispatch<React.SetStateAction<T>>,
		setErrors?: React.Dispatch<
			React.SetStateAction<Partial<Record<keyof T, string>>>
		>
	) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));

		if (setErrors) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	return { handleChange };
}
