import { useGlobal } from '@/context/GlobalContext';
import { formatDate } from '@/utils/format-date';
import { getBase64Image } from '@/utils/get-base-64-image';
import { useEffect, useRef, useState } from 'react';

const ViewInvoice = () => {
	const { globalState } = useGlobal();
	const { id: invoice_id } = globalState;

	const [organization, setOrganization] =
		useState<OrganizationProps | null>(null);
	const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
	const printRef = useRef<HTMLDivElement>(null);


	// Fetch invoice details
	useEffect(() => {
		if (!invoice_id) return;

		const fetchInvoice = async () => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}accounts/invoice/${invoice_id}`,
					{
						headers: {
							'Content-Type': 'application/json',
							'X-WP-Nonce': window.zettaSettingsData.nonce
						},
						credentials: 'include'
					}
				);
				const data = await response.json();
				setInvoice(data);
			} catch (error) {
				console.error('Error fetching invoice:', error);
			}
		};

		fetchInvoice();
	}, [invoice_id]);

	// Fetch organization details
	useEffect(() => {
		const fetchOrganization = async () => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}setting/organization`,
					{
						headers: {
							'Content-Type': 'application/json',
							'X-WP-Nonce': window.zettaSettingsData.nonce
						},
						credentials: 'include'
					}
				);

				const data = await response.json();
				if (data?.success) {
					const org = data?.data;
					if (org?.company_logo) {
						org.company_logo_base64 = await getBase64Image(
							org.company_logo
						);
					}
					setOrganization(org);
				}
			} catch (error) {
				console.error('Error fetching organization:', error);
			}
		};

		fetchOrganization();
	}, [invoice_id]);

	const handlePrint = () => {
		if (!printRef.current) return;

		const styles = `
			@page {
				size: auto;
				margin: 20mm;
			}
			body { font-family: Arial, sans-serif; padding: 10px; margin: 0; }
			h1 { font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem; }
			.container { padding: 1rem; background-color: white; border: 1px solid #d1d5db; border-radius: 0.5rem; max-width: 48rem; margin: auto; }
			.flex { display: flex; }
			.justify-between { justify-content: space-between; }
			.items-center { align-items: center; }
			.text-right { text-align: right; }
			.text-lg { font-size: 1.125rem; font-weight: bold; }
			.grid { display: grid; }
			.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
			.gap-4 { gap: 1rem; }
			.border { border: 1px solid #d1d5db; }
			.p-2 { padding: 0.5rem; }
			.p-4 { padding: 1rem; }
			.pl-4 { padding-left: 1.5rem; }
			.mb-6 { margin-bottom: 1.5rem; }
			.bg-gray-100 { background-color: #f3f4f6; }
			.rounded-md { border-radius: 0.375rem; }
			.text-green-600 { color: #16a34a; }
			.text-red-500 { color: #dc2626; }
			table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
			th, td { border: 1px solid #d1d5db; padding: 0.75rem; text-align: center; }
			th { background-color: #f3f4f6; }
			.page-footer {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				font-size: 0.875rem;
				color: #6b7280;
				padding: 10px 0;
			}
			@media print {
				button { display: none; }
				.container { box-shadow: none; border: none; }
			}
		`;

		const organizationDetails = organization
			? `
			<div class="flex items-center">
				<div class="flex items-center">
					${
						organization.company_logo
							? `<img src="${organization?.company_logo}" alt="Company Logo" class="w-20 h-auto pr-8" style="max-width: 120px; max-height: 80px;" />`
							: ''
					}
				</div>
				<div class="text-left pl-4 ">
					<p class="text-lg font-bold">${organization?.organization_name}</p>
					<p>Phone: ${organization?.phone}</p>
					<p>Email: ${organization?.email}</p>
					<p>Address: ${organization?.addressline_one}, ${
					organization?.addressline_two
			  }</p>
				</div>
			</div>`
			: '';

		const invoiceDetails = invoice
			? `
			<div class="grid grid-cols-2 ">
				<div>
					<p><strong>Invoice ID:</strong> ${invoice.invoice_unique_id}</p>
					<p><strong>Customer Name:</strong> ${invoice.customer_name}</p>
				</div>
				<div class="text-right">
					<p><strong>Invoice Date:</strong> ${formatDate(
						invoice.invoice_date
					)}</p>
					<p><strong>Due Date:</strong> ${formatDate(invoice?.due_date)}</p>
				</div>
				<div>
					<p><strong>Total Discount:</strong> ${invoice.total_discount}%</p>
				</div>
				<div class="text-right">
					<p><strong>Status:</strong> ${invoice.status}</p>
				</div>
			</div>`
			: '';

		const tableRows = invoice?.invoice_items
			?.map(
				item => `
				<tr>
					<td class="border p-2 text-center">${item.item_name}</td>
					<td class="border p-2 text-center">${item.quantity}</td>
					<td class="border p-2 text-center">${item.price}</td>
					<td class="border p-2 text-center">${item.item_discount}%</td>
					<td class="border p-2 text-center">${item.total}</td>
				</tr>`
			)
			.join('');

		const totals = `
		<div class="mt-6 text-right">
			<p><strong>Total Amount:</strong> ${invoice?.total_amount}</p>
			<p class="text-green-600"><strong>Paid Amount:</strong> ${invoice?.total_paid}</p>
			<p class="text-red-500"><strong>Due Amount:</strong> ${invoice?.remaining_amount}</p>
		</div>`;

		const newWindow = window.open(
			'',
			'_blank',
			'width=800,height=600'
		);
		if (newWindow) {
			newWindow.document.write(`
				<html>
					<head>
						<style>${styles}</style>
					</head>
					<body>
						<div class="container">
							${
								organizationDetails ?? (
									<p>You haven't Set your Company Detail yet</p>
								)
							}
							${invoiceDetails}
							<table>
								<thead>
									<tr>
										<th>Item Name</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Discount</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									${tableRows}
								</tbody>
							</table>
							${totals}
						</div>
						<script>window.print(); window.close();</script>
					</body>
				</html>
			`);
			newWindow.document.close();
		}
	};

	if (!invoice) {
		return <div className='text-center py-6'>Loading invoice...</div>;
	}

	return (
		<div>
			<h1 className='text-2xl font-bold text-center mb-6 text-blue-600'>
				Invoice Details
			</h1>

			{organization && (
				<div className='flex justify-between items-center mb-4 lg:p-4  rounded-md'>
					<div className='organization-details flex items-center'>
						{organization.company_logo && (
							<img
								src={organization.company_logo}
								alt='Company Logo'
								className='w-16 mr-4'
							/>
						)}
						<div>
							<p className='font-semibold text-lg'>
								{organization.organization_name}
							</p>
							<p>
								<strong>Phone:</strong> {organization?.phone}
							</p>
							<p>
								<strong>Email:</strong> {organization?.email}
							</p>
							<p>
								<strong>Address:</strong>{' '}
								{organization?.addressline_one}{' '}
								{organization?.addressline_two}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Invoice Details Section in Row-Wise Format */}
			<div className='invoice-details lg:p-4 rounded-md mb-4'>
				<div className='flex justify-between items-center mb-3'>
					<p>
						<strong>Invoice ID:</strong> {invoice.invoice_unique_id}
					</p>
					<p>
						<strong>Customer Name:</strong> {invoice.customer_name}
					</p>
				</div>
				<div className='flex justify-between items-center mb-3'>
					<p>
						<strong>Invoice Date:</strong>{' '}
						{formatDate(invoice.invoice_date)}
					</p>
					<p>
						<strong>Due Date:</strong> {formatDate(invoice.due_date)}
					</p>
				</div>
				<div className='flex justify-between items-center mb-3'>
					<p>
						<strong>Total Discount:</strong> {invoice.total_discount}%
					</p>
					<p>
						<strong>Status:</strong> {invoice.status}
					</p>
				</div>
			</div>

			<div ref={printRef} className='mb-6'>
				<table className='w-full border'>
					<thead>
						<tr>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Item Discount</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{invoice.invoice_items?.map((item, index) => (
							<tr key={index} className='text-center'>
								<td>{item.item_name}</td>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{item.item_discount} %</td>
								<td>{item.total}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='text-right mt-6'>
					<p>Total Amount: {invoice.total_amount}</p>
					<p className='text-green-600'>
						Paid Amount: {invoice.total_paid}
					</p>
					<p className='text-red-500'>
						Due Amount: {invoice.remaining_amount}
					</p>
				</div>
			</div>

			<div className='text-center mt-6'>
				<button
					onClick={handlePrint}
					className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
				>
					Print Invoice 🖨️
				</button>
			</div>
		</div>
	);
};

export default ViewInvoice;
