import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useHandleSearch from './useHandleSearch';

export interface EmployeeProps {
	id: number;
	first_name: string;
	last_name: string;
	employee_avatar: string;
}

interface ItemState {
	employees: EmployeeProps[];
	filteredEmployees: EmployeeProps[];
	totalItems: number;
	page: number;
	searchText: string;
}

export const useLeaveForm = () => {
	const { handleResetTableData } = useResetTableData();
	const {
		globalState: { action, id }
	} = useGlobal();

	const [query, setQuery] = useState('');
	const [errors, setErrors] = useState<{ [k: string]: string }>({});
	const [formData, setFormData] = useState({
		employee_id: '',
		first_name: '',
		last_name: '',
		employee_name: '',
		start_date: '',
		end_date: '',
		leave_type: '',
		reason: '',
		status: ''
	});

	const [itemState, setItemState] = useState<ItemState>({
		employees: [],
		filteredEmployees: [],
		totalItems: 0,
		page: 1,
		searchText: ''
	});

	const {
		searchText,
		page,
		employees,
		filteredEmployees,
		totalItems
	} = itemState;

	const fetchEmployees = useCallback(
		async (reset = false) => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}hrm/employee?index=${
						reset ? 1 : page
					}&query=${query}`,
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
				if (data?.data) {
					const newPage = searchText ? 1 : page + 1;
					setItemState(prev => ({
						...prev,
						employees: reset
							? data?.data
							: [...prev.employees, ...data?.data],
						filteredEmployees: reset
							? data?.data
							: [...prev.filteredEmployees, ...data?.data],
						totalItems: data?.total_items,
						page: newPage
					}));
				}
			} catch (error) {
				console.error('Error fetching employees:', error);
			}
		},
		[query, page]
	);

	useEffect(() => {
		if (id && id !== 0) {
			fetch(`${window.zettaSettingsData.api_url}hrm/leaves/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				credentials: 'include'
			})
				.then(response => response.json())
				.then(data => {
					if (data) {
						setFormData(prevFormData => ({
							...prevFormData,
							employee_id: data.employee_id || '',
							start_date: data.start_date || '',
							end_date: data.end_date || '',
							leave_type: data.leave_type || '',
							reason: data.reason || '',
							status: data.status || '',
							employee_name:
								data.first_name && data.last_name
									? `${data.first_name} ${data.last_name}`
									: ''
						}));
					}
				})
				.catch(error =>
					console.error('Error fetching leave data:', error)
				);
		}
	}, [id]);

	useEffect(() => {
		if (searchText) {
			setItemState(prev => ({ ...prev, page: 1 }));
		}
	}, [searchText]);

	useEffect(() => {
		fetchEmployees(true);
	}, [query]);

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
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
		if (!formData.employee_id.trim()) {
			e.employee_id = 'Employee name and id are required.';
		}
		if (!formData.start_date) e.start_date = 'Start date is required';
		if (!formData.end_date) e.end_date = 'End date is required';
		if (!formData.leave_type) e.leave_type = 'Leave type is required';
		if (!formData.reason.trim()) e.reason = 'Reason is required';
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}hrm/leaves/request`
				: `${window.zettaSettingsData.api_url}hrm/leaves/edit/${id}`;

		try {
			const response = await fetch(submitUrl, {
				method: action === 'create' ? 'POST' : 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});
			const responseData = await response.json();
			if (response.ok) {
				toast.success(
					responseData.message || 'Leave submitted successfully!'
				);
				setTimeout(() => {
					handleResetTableData();
				}, 1000);
			} else {
				toast.error(
					responseData.message || 'Error submitting leave.'
				);
			}
		} catch (error) {
			toast.error('Error submitting leave. Please try again.');
		}
	};
	const dataArray = searchText ? employees : filteredEmployees;

	const handleLoadMore = async () => {
		if (dataArray.length >= totalItems) return;
		const nextPage = page + 1;
		setItemState(prev => ({
			...prev,
			page: nextPage
		}));
		await fetchEmployees();
	};

	return {
		action,
		formData,
		setFormData,
		handleChange,
		filteredEmployees,
		inputValue,
		handleSubmit,
		handleSearch,
		handleLoadMore,
		errors
	};
};
