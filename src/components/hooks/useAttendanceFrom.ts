import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { makeUpperCase } from '@/utils/makeUpperCase';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

export const useAttendanceForm = () => {
	const { handleResetTableData } = useResetTableData();
	const {
		globalState: { action, id }
	} = useGlobal();
	const [query, setQuery] = useState('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [formData, setFormData] = useState({
		employee_id: '',
		status: '',
		attendance_date: '',
		first_name: '',
		last_name: '',
		employee_name: '',
		check_in_time: '',
		check_out_time: ''
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
			fetch(
				`${window.zettaSettingsData.api_url}hrm/attendance/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			)
				.then(response => response.json())
				.then(data => {
					if (data) {
						setFormData(prevFormData => ({
							...prevFormData, // retain other fields
							employee_id: data.employee_id || '',
							status: data.status || '',
							attendance_date: data.attendance_date || '',
							employee_name:
								data.first_name && data.last_name
									? `${data.first_name} ${data.last_name}`
									: '',
							check_in_time: data.check_in_time || '',
							check_out_time: data.check_out_time || ''
						}));
					}
				})
				.catch(error =>
					console.error('Error fetching attendance data:', error)
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
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		// If changing the attendance status
		if (name === 'status') {
			setFormData(prev => ({
				...prev,
				[name]: value,
				...(value !== 'Present' && {
					check_in_time: '',
					check_out_time: ''
				})
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}));
		}
	};
	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};
		if (!formData.employee_id.trim()) {
			validationErrors.employee_id =
				'Employee name and id are required.';
		}
		if (!formData.attendance_date.trim()) {
			validationErrors.attendance_date =
				'Attendance date is required.';
		}
		if (!formData.status) {
			validationErrors.status = 'Status is required.';
		}

		if (formData.status === 'Present') {
			if (!formData.check_in_time) {
				validationErrors.check_in_time = 'Check in time is required.';
			}
			if (!formData.check_out_time) {
				validationErrors.check_out_time =
					'Check out time is required.';
			}
		}

		setErrors(validationErrors);

		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmitAttendance = async () => {
		if (!validateForm()) return;
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}hrm/attendance`
				: `${window.zettaSettingsData.api_url}hrm/attendance/edit/${id}`;

		try {
			const response = await fetch(submitUrl, {
				method: action === 'create' ? 'POST' : 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				body: JSON.stringify(formData)
			});
			const responseData = await response.json();
			if (response.ok) {
				toast.success(
					responseData.message || 'Attendance submitted successfully!'
				);
				setTimeout(() => {
					handleResetTableData();
				}, 1000);
			} else {
				toast.error(
					makeUpperCase(
						responseData.message || 'Error submitting attendance.'
					)
				);
			}
		} catch (error) {
			toast.error('Error submitting attendance. Please try again.');
		}
	};

	const dataArray = searchText ? employees : filteredEmployees;

	// Handle Load More
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
		handleSubmitAttendance,
		filteredEmployees,
		handleChange,
		inputValue,
		handleSearch,
		handleLoadMore,
		errors
	};
};
