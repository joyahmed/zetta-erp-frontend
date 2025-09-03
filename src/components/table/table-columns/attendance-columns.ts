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
		key: 'late_time',
		text: 'Late Time'
	},
	{
		key: 'late_status',
		text: 'Late Status'
	},
	{
		key: 'check_out_time',
		text: 'Check Out Time'
	},
	{
		key: 'total_working_hours',
		text: 'Total Working Hours'
	},
	{
		key: 'overtime',
		text: 'Overtime'
	}
];
