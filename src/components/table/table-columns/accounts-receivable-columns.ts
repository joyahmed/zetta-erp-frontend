export const accountsReceivableColumns: {
	key: keyof AccountsReceivableProps;
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
		key: 'receivable_amount',
		text: 'Amount Receive'
	},
	{
		key: 'payment_status',
		text: 'Status'
	}
];
