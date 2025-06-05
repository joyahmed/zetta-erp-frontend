import { getAdminUrl } from '@/utils/get-admin-url';

const adminUrl = getAdminUrl();

const userRoles = window.zettaSettingsData?.current_user_roles || [];

export const menuItems: MenuItem[] =
	userRoles.includes('administrator') ||
	userRoles.includes('hr manager')
		? [
				{
					text: 'Department',
					link: `${adminUrl}admin.php?page=zetta_erp_department`
				},
				{
					text: 'Designation',
					link: `${adminUrl}admin.php?page=zetta_erp_designation`
				},
				{
					text: 'Employee',
					link: `${adminUrl}admin.php?page=zetta_erp_employee`
				},
				{
					text: 'Attendance',
					link: `${adminUrl}admin.php?page=zetta_erp_attendance`
				},
				{
					text: 'Holiday',
					link: `${adminUrl}admin.php?page=zetta_erp_holiday`
				}
		  ]
		: [
				{
					text: 'Employee',
					link: `${adminUrl}admin.php?page=zetta_erp_employees`
				},
				{
					text: 'Employee Profile',
					link: `${adminUrl}admin.php?page=zetta_erp_employee_profile`
				}
		  ];

// [
// 	{
// 		text: 'Department',
// 		link: `${adminUrl}admin.php?page=zetta_erp_department`
// 	},
// 	{
// 		text: 'Designation',
// 		link: `${adminUrl}admin.php?page=zetta_erp_designation`
// 	},
// 	{
// 		text: 'Employee',
// 		link: `${adminUrl}admin.php?page=zetta_erp_employee`
// 	},
// 	{
// 		text: 'Attendance',
// 		link: `${adminUrl}admin.php?page=zetta_erp_attendance`
// 	},
// 	{
// 		text: 'Holiday',
// 		link: `${adminUrl}admin.php?page=zetta_erp_holiday`
// 	},
// 	{
// 		text: 'Employees',
// 		link: `${adminUrl}admin.php?page=zetta_erp_employees`
// 	},
// 	{
// 		text: 'Employee Profile',
// 		link: `${adminUrl}admin.php?page=zetta_erp_employee_profile`
// 	}
// ];
