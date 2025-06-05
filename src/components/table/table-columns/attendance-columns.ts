export const attendanceColumns: {
	key: keyof AttendanceProps;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'first_name',
		text: 'Employee Name'
	},
	{
		key: 'attendance_date',
		text: 'Attendance Date'
	},
	{
		key: 'status',
		text: 'Status'
	},
	{
		key: 'check_in_time',
		text: 'Check In Time'
	},
	{
		key: 'check_out_time',
		text: 'Check Out Time'
	}
];
