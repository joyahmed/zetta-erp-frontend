import { formatDate } from '@/utils/format-date';
import {
	ChangeEvent,
	lazy,
	useEffect,
	useRef,
	useState
} from 'react';
import { toast } from 'react-toastify';
import CustomDropdown from './CustomDropdown';

const Loader = lazy(() => import('./Loader'));

interface AttendanceRecord {
	id: number;
	attendance_date: string;
	status: string;
	check_in_time?: string;
	check_out_time?: string;
	total_working_hours?: number;
	late_status?: string;
	late_time?: string;
	overtime?: number;
}

const months = [
	{ value: '01', label: 'January' },
	{ value: '02', label: 'February' },
	{ value: '03', label: 'March' },
	{ value: '04', label: 'April' },
	{ value: '05', label: 'May' },
	{ value: '06', label: 'June' },
	{ value: '07', label: 'July' },
	{ value: '08', label: 'August' },
	{ value: '09', label: 'September' },
	{ value: '10', label: 'October' },
	{ value: '11', label: 'November' },
	{ value: '12', label: 'December' }
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from(
	{ length: 5 },
	(_, i) => currentYear - i
);

interface PrintAttendanceProps {
	employeeId: number;
	employeeName: string;
	designation: string;
	employeeUniqueId: string;
}

const PrintAttendance = ({
	employeeId,
	employeeName,
	designation,
	employeeUniqueId
}: PrintAttendanceProps) => {
	const [attendanceData, setAttendanceData] = useState<
		AttendanceRecord[]
	>([]);
	const [loading, setLoading] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState(
		String(new Date().getMonth() + 1).padStart(2, '0')
	);
	const [selectedYear, setSelectedYear] =
		useState<number>(currentYear);
	const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
	const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

	const tableRef = useRef<HTMLDivElement>(null);

	const fetchAttendanceData = async () => {
		if (!employeeId) return;
		setLoading(true);
		const monthParam = `${selectedYear}-${selectedMonth}`;
		const url = new URL(
			`${window.zettaSettingsData.api_url}hrm/attendance`
		);
		url.searchParams.set('employee_id', employeeId.toString());
		url.searchParams.set('month', monthParam);
		url.searchParams.set('per_page', '31');
		url.searchParams.set('page', '1');

		try {
			const res = await fetch(url.toString(), {
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				credentials: 'include'
			});

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const json = await res.json();
			setAttendanceData(json.data || []);
		} catch (err) {
			console.error(err);
			toast.error('Failed to fetch attendance');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAttendanceData();
		setMonthDropdownOpen(false);
		setYearDropdownOpen(false);
	}, [employeeId, selectedMonth, selectedYear]);

	const handlePrint = () => {
		if (!tableRef.current) return;

		const content = tableRef.current.innerHTML;
		const printWindow = window.open(
			'',
			'_blank',
			'width=900,height=700'
		);

		if (printWindow) {
			printWindow.document.write(`
        <html>
          <head>
            <title>Attendance - ${selectedYear}-${selectedMonth}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { text-align: center; margin-bottom: 8px; }
              .info { margin-bottom: 20px; text-align: center; }
              .info p { margin: 4px 0; }
              table { width: 100%; border-collapse: collapse; font-size: 14px; }
              th, td { border: 1px solid #000; padding: 8px; text-align: center; }
              th { background: #f3f4f6; }
            </style>
          </head>
          <body>
            <h2>Attendance Sheet</h2>
            <div class="info">
              <p><strong>Name:</strong> ${employeeName}</p>
              <p><strong>Unique ID:</strong> ${employeeUniqueId}</p>
              <p><strong>Designation:</strong> ${designation}</p>
              <p><strong>Month:</strong> ${
								months.find(m => m.value === selectedMonth)?.label
							} ${selectedYear}</p>
            </div>
            ${content}
          </body>
        </html>
      `);
			printWindow.document.close();
			printWindow.focus();
			printWindow.print();
			printWindow.close();
		}
	};

	return (
		<>
			<div>
				<h2 className='text-xl font-bold text-center mb-2'>
					Attendance Report
				</h2>
				<div className='text-center mb-6 space-y-1'>
					<p>
						<strong>Unique ID:</strong> {employeeUniqueId}
					</p>
					<p>
						<strong>Designation:</strong> {designation}
					</p>
				</div>

				{/* Filters & Print */}
				<div className='flex justify-center items-center  gap-4 md:gap-6 mt-10 mb-6'>
					<CustomDropdown<string>
						{...{
							options: months,
							selected: selectedMonth,
							onSelect: setSelectedMonth,
							dropdownOpen: monthDropdownOpen,
							setDropdownOpen: setMonthDropdownOpen
						}}
					/>

					<CustomDropdown<number>
						{...{
							options: yearOptions.map(y => ({
								value: y,
								label: String(y)
							})),
							selected: selectedYear,
							onSelect: val => setSelectedYear(val as number),
							dropdownOpen: yearDropdownOpen,
							setDropdownOpen: setYearDropdownOpen
						}}
					/>
					<button
						onClick={handlePrint}
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
					>
						Print
					</button>
				</div>

				{/* Attendance Table */}
				<div ref={tableRef} className='overflow-x-auto'>
					{loading ? (
						<div className='flex items-center justify-center h-full w-full min-h-[50dvh]'>
							<Loader />
						</div>
					) : attendanceData.length ? (
						<table className='w-full text-sm mt-5'>
							<thead className=''>
								<tr>
									<th>Attendance Date</th>
									<th>Status</th>
									<th>Check In</th>
									<th>Late Time</th>
									<th>Late Status</th>
									<th>Check Out</th>
									<th>Total Hours</th>
									<th>Overtime</th>
								</tr>
							</thead>
							<tbody>
								{attendanceData.length ? (
									attendanceData.map(rec => (
										<tr key={rec.id} className='text-center'>
											<td>{formatDate(rec.attendance_date)}</td>
											<td>{rec.status}</td>
											<td>{rec.check_in_time || '—'}</td>
											<td>{rec.late_time || '—'}</td>
											<td>{rec.late_status || '—'}</td>
											<td>{rec.check_out_time || '—'}</td>
											<td>{rec.total_working_hours ?? '—'}</td>
											<td>{rec.overtime ?? '—'}</td>
										</tr>
									))
								) : (
									<tr></tr>
								)}
							</tbody>
						</table>
					) : (
						<p className='flex items-center justify-center text-center w-full h-full  min-h-[20dvh] text-red-400 font-semibold text-lg'>
							<span>No records found for this period.</span>
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default PrintAttendance;
