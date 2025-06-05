export const transactionColumns: {
	key: keyof TransactionProps;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'invoice_id',
		text: 'Invoice ID'
	},
	{
		key: 'customer_name',
		text: 'Customer Name'
	},
	{
		key: 'paid_amount',
		text: 'Paid Amount'
	},
	{
		key: 'method_name',
		text: 'Payment Method'
	},
	{
		key: 'transaction_type',
		text: 'Transaction Type'
	},
	{
		key: 'transaction_date',
		text: 'Transaction Date'
	},
	{
		key: 'notes',
		text: 'Notes'
	}
];
