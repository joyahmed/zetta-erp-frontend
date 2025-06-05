import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface InvoiceProps {
	id: number;
	invoice_unique_id: string;
}

interface PaymentMethodProps {
	id: number;
	method_name: string;
}

interface ItemState {
	invoices: InvoiceProps[];
	filteredInvoices: InvoiceProps[];
	totalItems: number;
	page: number;
	searchText: string;
}

export const useTransactionForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState({
		invoice_id: '',
		invoice_unique_id: '',
		paid_amount: '',
		transaction_type: '',
		method_name: '',
		notes: '',
		payment_method_id: '',
		transaction_date: ''
	});

	const [itemState, setItemState] = useState<ItemState>({
		invoices: [],
		filteredInvoices: [],
		totalItems: 0,
		page: 1,
		searchText: ''
	});

	const { searchText, page, invoices, filteredInvoices, totalItems } =
		itemState;

	const [paymentMethods, setPaymentMethods] = useState<
		{ label: string; value: number }[]
	>([]);

	// Unified Fetch Function
	const fetchInvoices = useCallback(
		async (reset = false) => {
			try {
				const response = await fetch(
					`${
						window.zettaSettingsData.api_url
					}accounts/invoice?index=${reset ? 1 : page}&query=${query}`,
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
						invoices: reset
							? data.data
							: [...prev.invoices, ...data?.data],
						filteredInvoices: reset
							? data.data
							: [...prev.filteredInvoices, ...data?.data],
						totalItems: data?.total_items,
						page: newPage
					}));
				}
			} catch (error) {
				console.error('Error fetching invoices:', error);
			}
		},
		[query, page]
	);

	useEffect(() => {
		const fetchData = async () => {
			await fetchInvoices(true);
		};
		if (searchText) {
			setItemState(prev => ({ ...prev, page: 1 }));
		}
		fetchData();
	}, [query, searchText]);

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState,
		setQuery
	});

	// Fetch Payment Methods
	const fetchPaymentMethods = useCallback(async () => {
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}accounts/payment-method`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const data: { data: PaymentMethodProps[] } =
				await response.json();
			if (data?.data) {
				const transformedData = data?.data.map(method => ({
					label: method.method_name,
					value: method.id
				}));
				setPaymentMethods(transformedData);
			}
		} catch (error) {
			console.error('Error fetching payment methods:', error);
		}
	}, []);

	useEffect(() => {
		fetchPaymentMethods();
	}, []);

	useEffect(() => {
		if (id && id !== 0) {
			fetch(
				`${window.zettaSettingsData.api_url}accounts/transaction/${id}`,
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
							...prevFormData,
							invoice_id: data.invoice_id || '',
							invoice_unique_id: data.invoice_unique_id || '',
							paid_amount: data.paid_amount || '',
							transaction_type: data.transaction_type || '',
							method_name: data.method_name || '',
							payment_method_id: data.payment_method_id || '',
							notes: data.notes || '',
							transaction_date: data?.transaction_date || ''
						}));
					}
				})
				.catch(error =>
					console.error('Error fetching transaction data:', error)
				);
		}
	}, [id]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};
	const handleSubmitTransaction = async () => {
		const submitUrl =
			action === 'create'
				? `${window.zettaSettingsData.api_url}accounts/transaction`
				: `${window.zettaSettingsData.api_url}accounts/transaction/edit/${id}`;

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
						'Transaction submitted successfully!'
				);
				handleResetTableData();
			} else {
				toast.error(
					responseData.message || 'Error submitting transaction.'
				);
			}
		} catch (error) {
			toast.error('Error submitting transaction. Please try again.');
		}
	};
	const dataArray = searchText ? invoices : filteredInvoices;

	// Handle Load More
	const handleLoadMore = async () => {
		if (dataArray.length >= totalItems) return;

		const nextPage = page + 1;

		setItemState(prev => ({
			...prev,
			page: nextPage
		}));
		await fetchInvoices();
	};

	return {
		action,
		formData,
		setFormData,
		handleChange,
		handleSubmitTransaction,
		filteredInvoices,
		inputValue,
		handleSearch,
		handleLoadMore,
		paymentMethods
	};
};
