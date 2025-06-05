import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { makeUpperCase } from '@/utils/makeUpperCase';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface ItemState {
	customers: CustomerProps[];
	filteredCustomers: CustomerProps[];
	totalItems: number;
	page: number;
	searchText: string;
}

export const useInvoiceForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState({
		customer_id: '',
		customer_name: '',
		due_date: '',
		total_discount: 0,
		invoice_items: [] as InvoiceItem[]
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [invoiceItemsErrors, setInvoiceItemsErrors] = useState<{
		[key: string]: string;
	}>({});
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

	const [useTotalDiscount, setUseTotalDiscount] =
		useState<boolean>(true);

	const fetchItem = async () => {
		if (!id) return;
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}accounts/invoice/${id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const data = await response.json();
			if (data.invoice_date) {
				setFormData(data);
				setUseTotalDiscount(data.total_discount > 0);
			}
		} catch (error) {
			console.error('Error fetching invoice:', error);
		}
	};

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
		fetchCustomers(true);
	}, [query]);

	useEffect(() => {
		if (searchText) {
			setItemState(prev => ({ ...prev, page: 1 }));
		}
	}, [searchText]);

	useEffect(() => {
		if (id) {
			fetchItem();
		}
	}, [id]);

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: '' }));
	};

	const handleItemChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => {
			const updatedItems = [...prev.invoice_items];
			updatedItems[index] = { ...updatedItems[index], [name]: value };
			return { ...prev, invoice_items: updatedItems };
		});
		setErrors(prev => ({ ...prev, [name]: '' }));
		setInvoiceItemsErrors(prev => ({ ...prev, [name]: '' }));
	};

	const handleAddItem = () => {
		setFormData(prev => ({
			...prev,
			invoice_items: [
				...prev.invoice_items,
				{
					id: 0,
					item_name: '',
					quantity: 0,
					price: 0,
					total: 0,
					description: '',
					item_discount: 0
				}
			]
		}));
	};

	const handleRemoveItem = (index: number) => {
		setFormData(prev => ({
			...prev,
			invoice_items: prev.invoice_items.filter((_, i) => i !== index)
		}));
	};
	const validateForm = () => {
		const validationErrors: { [key: string]: string } = {};
		const itemErrors: { [key: string]: string } = {};

		if (!formData.customer_id.trim()) {
			validationErrors.customer_id =
				'Customer name and id are required.';
		}
		if (!formData.due_date) {
			validationErrors.due_date = 'Due date is required.';
		}
		// if (useTotalDiscount && !formData.total_discount) {
		// 	validationErrors.total_discount = 'Total discount is required.';
		// }
		if (!formData.invoice_items.length) {
			validationErrors.invoice_items =
				'At least one invoice item is required.';
		} else {
			formData.invoice_items.forEach((item, index) => {
				if (!item.item_name.trim()) {
					itemErrors[`${index}.item_name`] = 'Item name is required.';
				}
				if (!item.quantity || item.quantity <= 0) {
					itemErrors[`${index}.quantity`] =
						'Quantity is required and must be greater than 0.';
				}
				if (!item.price || item.price <= 0) {
					itemErrors[`${index}.price`] =
						'Price is required and must be greater than 0..';
				}
				// if (!item.total || item.total <= 0) {
				// 	itemErrors[`${index}.total`] =
				// 		'Total is required and must be greater than 0.';
				// }
				// if (!useTotalDiscount) {
				// 	if (!item.item_discount || item.item_discount <= 0) {
				// 		itemErrors[`${index}.item_discount`] =
				// 			'Item discount is required and must be greater than 0.';
				// 	}
				// }
			});
		}
		// Update both error states
		setErrors(validationErrors);
		setInvoiceItemsErrors(itemErrors);

		// Validation passes only if both are empty
		return (
			Object.keys(validationErrors).length === 0 &&
			Object.keys(itemErrors).length === 0
		);
	};

	const handleSubmitInvoice = async () => {
		const isValid = validateForm();
		if (!isValid) return;
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}accounts/invoice`
				: `${window.zettaSettingsData.api_url}accounts/invoice/edit/${id}`;

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
					responseData.message || 'Invoice submitted successfully!'
				);
				handleResetTableData();
			} else {
				toast.error(
					makeUpperCase(
						responseData.message || 'Error submitting invoice.'
					)
				);
			}
		} catch (error) {
			toast.error('Error submitting invoice. Please try again.');
		}
	};

	const handleToggleDiscount = () => {
		setUseTotalDiscount(prev => !prev);
		setFormData(prev => ({
			...prev,
			total_discount: 0,
			invoice_items: prev.invoice_items.map(item => ({
				...item,
				item_discount: 0
			}))
		}));
	};

	const dataArray = searchText ? customers : filteredCustomers;

	// Handle Load More
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
		useTotalDiscount,
		setUseTotalDiscount,
		fetchItem,
		handleChange,
		handleItemChange,
		handleAddItem,
		handleRemoveItem,
		handleSubmitInvoice,
		handleToggleDiscount,
		inputValue,
		handleSearch,
		handleLoadMore,
		filteredCustomers,
		errors,
		invoiceItemsErrors
	};
};
