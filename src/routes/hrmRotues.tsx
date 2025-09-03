import Attendance from '@/components/Attendance';
import Department from '@/components/Department';
import Designation from '@/components/Designation';
import Employee from '@/components/Employee';
import EmployeeAttendance from '@/components/EmployeeAttendance';
import EmployeeLeaveRequest from '@/components/EmployeeLeaveRequest';
import Holidays from '@/components/HolidaysAdmin';
import Leave from '@/components/Leave';
import PeopleDashboard from '@/components/People';
import Profile from '@/components/Profile';
import { ComponentType } from 'react';

const hrmRoutes: { [key: string]: ComponentType<{}> } = {
	'hrm-department': Department,
	'hrm-designation': Designation,
	'hrm-employee': Employee,
	'hrm-attendance': Attendance,
	'hrm-leave': Leave,
	'hrm-employees': PeopleDashboard,
	'hrm-profile': Profile,
	'hrm-employee-attendance': EmployeeAttendance,
	'hrm-employee-leave-request': EmployeeLeaveRequest,
	'hrm-holiday': Holidays
};

export default hrmRoutes;
