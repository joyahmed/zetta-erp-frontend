import PeopleDashboard from '@/components/People';
import Profile from '@/screens/hrm/Profile';
import { ComponentType } from 'react';

const peopleRoutes: { [key: string]: ComponentType<{}> } = {
	'zetta-people': PeopleDashboard,
	'zetta-profile': Profile
};

export default peopleRoutes;
