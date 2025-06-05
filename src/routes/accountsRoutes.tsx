import AccountsReceivable from '@/components/AccountsReceivable';
import Invoice from '@/components/Invoice';
import PaymentMethod from '@/components/PaymentMethod';
import Transaction from '@/components/Transaction';
import { ComponentType } from 'react';

/**
 * Map of page identifiers to components.
 */
const accountsRoutes: { [key: string]: ComponentType<{}> } = {
	'accounts-payment-method': PaymentMethod,
	'accounts-invoice': Invoice,
	'accounts-transaction': Transaction,
	'accounts-receivable': AccountsReceivable
	// 'accounts-payable': AccountsPayable
};

export default accountsRoutes;
