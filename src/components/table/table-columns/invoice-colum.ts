export const invoiceColumns: {
	key: keyof InvoiceProps;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'invoice_unique_id',
		text: 'Invoice Unique ID'
	},
	{
		key: 'customer_name',
		text: 'Customer Name'
	},

	{
		key: 'item_name',
		text: 'Items '
	},
	{
		key: 'total_discount',
		text: 'Total Discount'
	},
	{
		key: 'invoice_date',
		text: 'Invoice Date'
	},
	{
		key: 'total_amount',
		text: 'Total Amount'
	},
	{
		key: 'total_paid',
		text: 'Paid Amount'
	},
	{
		key: 'remaining_amount',
		text: 'Due Amount'
	},
	{
		key: 'status',
		text: 'Status'
	},
	{
		key: 'due_date',
		text: 'Due Date'
	}
];
