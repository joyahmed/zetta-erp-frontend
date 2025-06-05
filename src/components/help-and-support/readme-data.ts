export const readmeData = {
	title: 'Zetta ERP',
	contributors: ['Joy Ahmed', 'Mominur Rahman Emon'],
	author: 'Zettabyte Technology Incorporation',
	description:
		'Zetta ERP is a flexible ERP solution for WordPress, offering CRM, HRM, and financial tools to streamline business operations.',
	features: [
		'Customer Relationship Management (CRM)',
		'Invoice & Transaction Management',
		'Accounts Receivable Management',
		// 'User Role & Permission Management',
		'Employee Records & Attendance Tracking',
		'Basic Reporting & Analytics'
	],
	installation: [
		'Ensure your WordPress installation is updated to the latest version.',
		'Verify that your hosting meets the minimum PHP and MySQL requirements.',
		'Go to **Plugins > Add New** in the WordPress dashboard.',
		'Search for **"Zetta ERP"** or upload the plugin ZIP file manually.',
		'Click **"Install Now"** and activate the plugin once installed.',
		'Go to **Zetta ERP > Settings** to configure essential options.'
	],
	changelog: [
		{
			version: '1.0.0',
			changes: [
				'Initial release with CRM, HRM, and core financial functionalities:',
				'- Invoice & Transaction Management',
				'- Accounts Receivable (Auto-Managed)',
				'- User Role Management',
				'- Attendance & Employee Tracking'
			]
		}
	],
	screenshots: [
		{
			title: 'CRM Dashboard',
			description:
				'Monitor customers, leads, and activity logs at a glance.'
		},
		{
			title: 'Invoice & Transaction Management',
			description:
				'Create, track, and manage invoices and transactions.'
		},
		{
			title: 'Accounts Receivable',
			description:
				'Automatically track outstanding payments from transactions.'
		},
		{
			title: 'HRM System',
			description: 'Manage employees, and track attendance.'
		}
	],
	faq: [
		{
			question: 'Is Zetta ERP free?',
			answer:
				'Yes, the core version is free. Premium add-ons will be available in future updates.'
		},
		{
			question: 'Does Zetta ERP support real-time notifications?',
			answer:
				'Currently, it uses API-based polling for notifications. WebSocket-based real-time notifications are planned for future updates.'
		},
		{
			question: 'Can I manage invoices and payments with Zetta ERP?',
			answer:
				'Yes, Zetta ERP includes invoice management, transaction tracking, and payment method management. Accounts Receivable is automatically updated based on transactions.'
		}
	]
};
