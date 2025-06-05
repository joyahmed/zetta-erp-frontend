import Attendance from '@/components/Attendance';
import Department from '@/components/Department';
import Designation from '@/components/Designation';
import Employee from '@/components/Employee';
import Holidays from '@/components/HolidaysAdmin';
import PeopleDashboard from '@/components/People';
import Profile from '@/components/Profile';
import { ComponentType } from 'react';

const hrmRoutes: { [key: string]: ComponentType<{}> } = {
	'hrm-department': Department,
	'hrm-designation': Designation,
	'hrm-employee': Employee,
	'hrm-attendance': Attendance,
	'hrm-employees': PeopleDashboard,
	'hrm-profile': Profile,
	'hrm-holiday': Holidays
};

export default hrmRoutes;
