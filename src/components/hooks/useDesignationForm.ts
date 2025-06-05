import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { makeUpperCase } from '@/utils/makeUpperCase';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface Department {
	id: number;
	department_name: string;
}

interface ItemState {
	departments: Department[];
	filteredDepartments: Department[];
	totalItems: number;
	page: number;
	searchText: string;
}

export const useDesignationForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState({
		designation_name: '',
		department_id: '',
		department_name: ''
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [itemState, setItemState] = useState<ItemState>({
		departments: [],
		filteredDepartments: [],
		totalItems: 0,
		page: 1,
		searchText: ''
	});

	const {
		searchText,
		page,
		departments,
		filteredDepartments,
		totalItems
	} = itemState;

	// Unified Fetch Function
	const fetchDepartments = useCallback(
		async (reset = false) => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}hrm/department?index=${
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
						departments: data?.data,
						filteredDepartments: reset
							? data?.data
							: [...prev.filteredDepartments, ...data?.data],
						totalItems: data?.total_items,
						//page: reset ? 1 : prev.page
						page: newPage
					}));
				}
			} catch (error) {
				console.error('Error fetching departments:', error);
			}
		},
		[query, page]
	);

	useEffect(() => {
		// If there's an ID and it's not zero, fetch the data for editing
		if (id && id !== 0) {
			fetch(
				`${window.zettaSettingsData.api_url}hrm/designation/${id}`,
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
						// Ensure formData is updated with fetched data
						setFormData({
							designation_name: data.designation_name || '',
							department_id: data.department_id || '',
							department_name: data.department_name || ''
						});
					}
				})
				.catch(error =>
					console.error('Error fetching designation data:', error)
				);
		}
	}, [id]);

	useEffect(() => {
		if (searchText) {
			setItemState(prev => ({
				...prev,
				page: 1
			}));
		}
	}, [searchText]);

	useEffect(() => {
		fetchDepartments(true);
	}, [query]);

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: '' }));
	};

	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};

		if (!formData.designation_name.trim()) {
			validationErrors.designation_name =
				'Designation name is required.';
		}

		if (!formData.department_id) {
			validationErrors.department_id =
				'Department selection is required.';
		}

		setErrors(validationErrors);

		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmitDesignation = async () => {
		if (!validateForm()) return;
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}hrm/designation`
				: `${window.zettaSettingsData.api_url}hrm/designation/edit/${id}`;

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
					responseData.message ||
						'Designation submitted successfully!'
				);
				handleResetTableData();
			} else {
				toast.error(
					makeUpperCase(
						responseData.message || 'Error submitting designation.'
					)
				);
			}
		} catch (error) {
			toast.error('Error submitting designation. Please try again.');
		}
	};

	const dataArray = searchText ? departments : filteredDepartments;

	// Handle Load More
	const handleLoadMore = async () => {
		if (dataArray.length >= totalItems) return;

		const nextPage = page + 1;

		setItemState(prev => ({
			...prev,
			page: nextPage
		}));
		await fetchDepartments();
	};

	return {
		action,
		formData,
		setFormData,
		handleSubmitDesignation,
		filteredDepartments,
		handleChange,
		inputValue,
		handleSearch,
		handleLoadMore,
		errors
	};
};
