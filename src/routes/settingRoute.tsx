import Holidays from '@/components/HolidaysAdmin';
import { ComponentType } from 'react';

/**
 * Map of page identifiers to components.
 */
const settingRoutes: { [key: string]: ComponentType<{}> } = {
	holidays: Holidays
};

export default settingRoutes;
