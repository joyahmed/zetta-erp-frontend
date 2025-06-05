export const accountsPayableColumns: {
	key: keyof AccountsPayableProps;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'invoice_unique_id',
		text: 'Invoice ID'
	},
	{
		key: 'customer_name',
		text: 'Customer Name'
	},
	{
		key: 'payable_amount',
		text: 'Amount Payable'
	},
	{
		key: 'payment_status',
		text: 'Status'
	}
];
