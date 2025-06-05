export const organizationFormFields = [
	{
		tab: 1,
		label: 'Organization Name',
		type: 'text',
		name: 'organization_name',
		required: true
	},
	{
		tab: 2,
		label: 'Address Line One',
		type: 'textarea',
		name: 'addressline_one',
		required: true
	},
	{
		tab: 2,
		label: 'Address Line Two',
		type: 'textarea',
		name: 'addressline_two'
	},
	{
		tab: 3,
		label: 'Phone',
		type: 'tel',
		name: 'phone',
		required: true
	},
	{
		tab: 3,
		label: 'Email',
		type: 'email',
		name: 'email',
		required: true
	},
	{
		tab: 4,
		label: 'Organization Logo',
		type: 'button',
		name: 'company_logo'
	}
];

export const organizationSettingTabs = [
	{
		id: 1,
		title: 'Organization Detail'
	},
	{
		id: 2,
		title: 'Organization Address'
	},
	{
		id: 3,
		title: 'Contact Information'
	},
	{
		id: 4,
		title: 'Organization Logo'
	}
];
