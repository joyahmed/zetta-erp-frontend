import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface Customer {
	id: number;
	customer_name: string;
}

interface ItemState {
	customers: Customer[];
	filteredCustomers: Customer[];
	totalItems: number;
	page: number;
	searchText: string;
}

export const useCustomerAddressForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState({
		customer_id: '',
		customer_name: '',
		address_line_1: '',
		address_line_2: '',
		city: '',
		state: '',
		postal_code: '',
		country: '',
		address_type: ''
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [itemState, setItemState] = useState<ItemState>({
		customers: [],
		filteredCustomers: [],
		totalItems: 0,
		page: 1,
		searchText: ''
	});

	const {
		searchText,
		page,
		customers,
		filteredCustomers,
		totalItems
	} = itemState;

	const fetchCustomers = useCallback(
		async (reset = false) => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}crm/customer?index=${
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
						customers: reset
							? data?.data
							: [...prev.customers, ...data?.data],
						filteredCustomers: reset
							? data?.data
							: [...prev.filteredCustomers, ...data?.data],
						totalItems: data?.total_items,
						page: newPage
					}));
				}
			} catch (error) {
				console.error('Error fetching customers:', error);
			}
		},
		[query, page]
	);

	useEffect(() => {
		if (id && id !== 0) {
			fetch(
				`${window.zettaSettingsData.api_url}crm/customer-address/${id}`,
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
						setFormData({
							customer_id: data.customer_id || '',
							customer_name: data.customer_name || '',
							address_line_1: data.address_line_1 || '',
							address_line_2: data.address_line_2 || '',
							city: data.city || '',
							state: data.state || '',
							postal_code: data.postal_code || '',
							country: data.country || '',
							address_type: data.address_type || ''
						});
					}
				})
				.catch(error =>
					console.error(
						'Error fetching customer address data:',
						error
					)
				);
		}
	}, [id, filteredCustomers]);

	useEffect(() => {
		if (searchText) {
			setItemState(prev => ({ ...prev, page: 1 }));
		}
	}, [searchText]);

	useEffect(() => {
		fetchCustomers(true);
	}, [query]);

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: '' }));
	};

	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};
		if (!formData.customer_id.trim()) {
			validationErrors.customer_id =
				'Customer name and id are required.';
		}
		if (!formData.address_line_1) {
			validationErrors.address_line_1 =
				'Address line one is required.';
		}
		if (!formData.city) {
			validationErrors.city = 'City is required.';
		}
		if (!formData.state) {
			validationErrors.state = 'State is required.';
		}
		if (!formData.postal_code) {
			validationErrors.postal_code = 'Postal code is required.';
		}
		if (!formData.country) {
			validationErrors.country = 'Country is required.';
		}
		if (!formData.address_type) {
			validationErrors.address_type = 'Address type is required.';
		}

		setErrors(validationErrors);

		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmitCustomerAddress = async () => {
		if (!validateForm()) return;
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}crm/customer-address`
				: `${window.zettaSettingsData.api_url}crm/customer-address/edit/${id}`;

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
						'Customer address submitted successfully!'
				);
				handleResetTableData();
			} else {
				toast.error(
					responseData.message || 'Error submitting customer address.'
				);
			}
		} catch (error) {
			toast.error(
				'Error submitting customer address. Please try again.'
			);
		}
	};

	const dataArray = searchText ? customers : filteredCustomers;

	const handleLoadMore = async () => {
		if (dataArray.length >= totalItems) return;
		const nextPage = page + 1;
		setItemState(prev => ({
			...prev,
			page: nextPage
		}));
		await fetchCustomers();
	};

	return {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitCustomerAddress,
		filteredCustomers,
		handleSearch,
		handleLoadMore,
		inputValue,
		errors
	};
};
