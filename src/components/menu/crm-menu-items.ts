import { getAdminUrl } from '@/utils/get-admin-url';
const adminUrl = getAdminUrl();
export const menuItems: MenuItem[] = [
	{
		text: 'Customer',
		link: `${adminUrl}admin.php?page=zetta_erp_customer`
	},
	{
		text: 'Customer Address',
		link: `${adminUrl}admin.php?page=zetta_erp_customer_address`
	}
];
