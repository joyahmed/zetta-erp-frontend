export const customerAddressColumns: {
	key: keyof CustomerAddressProps;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'customer_name',
		text: 'Customer Name'
	},

	{
		key: 'address_line_1',
		text: 'Address Field One'
	},
	{
		key: 'address_line_2',
		text: 'Address Field Two'
	},
	{
		key: 'city',
		text: 'City'
	},
	{
		key: 'state',
		text: 'State'
	},
	{
		key: 'postal_code',
		text: 'Postal Code'
	},
	{
		key: 'country',
		text: 'Country'
	},
	{
		key: 'address_type',
		text: 'Address Type'
	}
];
