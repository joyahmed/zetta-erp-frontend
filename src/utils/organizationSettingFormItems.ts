export const organizationFormFields = [
	{
		tab: 1,
		label: 'Organization Name',
		type: 'text',
		name: 'organization_name',
		required: true,
		colspan: 'col-span-2'
	},
	{
		tab: 1,
		label: 'Phone',
		type: 'tel',
		name: 'phone',
		required: true,
		colspan: 'col-span-2 lg:col-span-1'
	},
	{
		tab: 1,
		label: 'Email',
		type: 'email',
		name: 'email',
		required: true,
		colspan: 'col-span-2 lg:col-span-1'
	},
	{
		tab: 1,
		label: 'Address Line One',
		type: 'textarea',
		name: 'addressline_one',
		colspan: 'col-span-2',
		required: true
	},
	{
		tab: 1,
		label: 'Address Line Two',
		type: 'textarea',
		name: 'addressline_two',
		colspan: 'col-span-2'
	},
	{
		tab: 2,
		label: 'Organization Logo',
		type: 'button',
		name: 'company_logo',
		colspan: 'col-span-2'
	},
	{
		tab: 3,
		label: 'Organization IP',
		type: 'text',
		name: 'allowed_ip',
		colspan: 'col-span-2'
	},
	{
		tab: 4,
		label: 'Office Start Time',
		type: 'time',
		name: 'office_checkin_time'
	},
	{
		tab: 4,
		label: 'Office End Time',
		type: 'time',
		name: 'office_checkout_time'
	},
	{
		tab: 4,
		label: 'Grace Minutes',
		type: 'number',
		name: 'grace_minutes',
		colspan: 'col-span-2',
		required: true
	}
];

export const organizationSettingTabs = [
	{
		id: 1,
		title: 'Organization Detail'
	},
	{
		id: 2,
		title: 'Organization Logo'
	},
	{
		id: 3,
		title: 'Organization IP'
	},
	{
		id: 4,
		title: 'Office Time'
	}
];
