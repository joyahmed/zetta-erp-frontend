export const steps = [
	{
		title: 'Step 1: Pre-installation Requirements',
		items: [
			'Ensure your WordPress installation is updated to the latest version.',
			'Verify that your hosting environment meets the minimum PHP and MySQL requirements.',
			'Deactivate and uninstall any conflicting ERP or business management plugins.'
		]
	},
	{
		title: 'Step 2: Installing Zetta ERP',
		items: [
			'Log in to your WordPress Admin account.',
			'Go to Plugins > Add New in the dashboard.',
			'Search for "Zetta ERP" or upload the plugin ZIP file if downloaded manually.',
			'Click "Install Now" and activate the plugin once installed.'
		]
	},
	{
		title: 'Step 3: Initial Configuration',
		items: [
			'Go to Zetta ERP > Settings to configure essential options.',
			'Set your business details under **Organization Settings**.',
			'Set your weekends under **Weekends Settings**.',
			'Assign roles and permissions for team members under **User Management**.',
			'Optionally, **seed your ERP with dummy data** under **Settings > Seed Dummy Data**.'
		]
	},
	{
		title: 'Step 4: Basic Functionality Test',
		items: [
			'Create a test customer under **CRM** and verify that it appears correctly.',
			'Check if **HRM features** like employee records and attendance tracking work as expected.',
			'Add a sample transaction in the **Accounts module** to ensure financial tracking is functional.'
		]
	}
];
