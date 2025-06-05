import AccountsDashboard from '@/components/AccountsDashboard';
import CrmDashboard from '@/components/CrmDashboard';
import HrmDashboard from '@/components/HrmDashboard';
import MainDashboard from '@/components/MainDashboard';
import { ComponentType } from 'react';
import SettingDashboard from '../components/SettingDashboard';

/**
 * Map of page identifiers to components.
 */
const mainRoutes: { [key: string]: ComponentType<{}> } = {
	dashboard: MainDashboard,
	'hrm-dashboard': HrmDashboard,
	'crm-dashboard': CrmDashboard,
	'accounts-dashboard': AccountsDashboard,
	'setting-dashboard': SettingDashboard
};

export default mainRoutes;
