import { getAdminUrl } from '@/utils/get-admin-url';
const adminUrl = getAdminUrl();
export const menuItems: MenuItem[] = [
	{
		text: 'Payment Method',
		link: `${adminUrl}admin.php?page=zetta_erp_payment_method`
	},
	{
		text: 'Invoice',
		link: `${adminUrl}admin.php?page=zetta_erp_invoice`
	},
	{
		text: 'Transaction',
		link: `${adminUrl}admin.php?page=zetta_erp_transaction`
	},
	{
		text: 'Receivable',
		link: `${adminUrl}admin.php?page=zetta_erp_receivable`
	},
	// {
	// 	text: 'Payable',
	// 	link: `${adminUrl}admin.php?page=zetta_erp_payable`
	// }
];
