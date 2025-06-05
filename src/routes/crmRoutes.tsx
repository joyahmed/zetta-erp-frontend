import Customer from '@/components/Customer';
import CustomerAddress from '@/components/CustomerAddress';
import { ComponentType } from 'react';

/**
 * Map of page identifiers to components.
 */
const crmRoutes: { [key: string]: ComponentType<{}> } = {
	'crm-customer': Customer,
	'crm-customer-address': CustomerAddress
};

export default crmRoutes;
