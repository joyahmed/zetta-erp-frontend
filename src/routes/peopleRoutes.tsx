import EmployeeAttendance from '@/components/EmployeeAttendance';
import PeopleDashboard from '@/components/People';
import Profile from '@/components/Profile';
import { ComponentType } from 'react';

const peopleRoutes: { [key: string]: ComponentType<{}> } = {
	'zetta-people': PeopleDashboard,
	'zetta-profile': Profile,
	'zetta-employee-attendance': EmployeeAttendance
};

export default peopleRoutes;
