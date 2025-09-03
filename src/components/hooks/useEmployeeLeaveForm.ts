import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useEmployeeLeaveForm = () => {
	const { handleResetTableData } = useResetTableData();
	const {
		globalState: { action, id }
	} = useGlobal();

	const [errors, setErrors] = useState<{ [k: string]: string }>({});
	const [formData, setFormData] = useState({
		start_date: '',
		end_date: '',
		leave_type: '',
		reason: ''
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		const e: { [k: string]: string } = {};
		if (!formData.start_date) e.start_date = 'Start date is required';
		if (!formData.end_date) e.end_date = 'End date is required';
		if (!formData.leave_type) e.leave_type = 'Leave type is required';
		if (!formData.reason.trim()) e.reason = 'Reason is required';
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		const url =
			action === 'create'
				? `${window.zettaSettingsData.api_url}hrm/leaves/request`
				: `${window.zettaSettingsData.api_url}hrm/leaves/edit/${id}`;

		try {
			const res = await fetch(url, {
				method: action === 'create' ? 'POST' : 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json.message || 'Request failed');

			toast.success(json.message || 'Success!');
			handleResetTableData();
		} catch (err: any) {
			toast.error(err.message || 'Something went wrong');
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
