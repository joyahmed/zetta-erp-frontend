import { useGlobal } from '@/context/GlobalContext';
import { formatDate } from '@/utils/format-date';
import { lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const PrintAttendance = lazy(() => import('./PrintAttendance'));
const Loader = lazy(() => import('./Loader'));

const ViewEmployee = () => {
	const { globalState } = useGlobal();
	const { id } = globalState;
	const [employeeData, setEmployeeData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<
		'details' | 'attendance'
	>('details');

	const fetchEmployeeData = async () => {
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}hrm/employee/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce
					},
					credentials: 'include'
				}
			);
			const data = await response.json();
			setEmployeeData(data);
			setLoading(false);
		} catch (error) {
			toast.error('Failed to fetch employee data');
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			fetchEmployeeData(); // Only fetch if `id` is provided
		}
	}, [id]);

	// If the data is still loading, show a loading message
	if (loading) {
		return (
			<div className='flex items-center justify-center h-full w-full min-h-[50dvh]'>
				<Loader />
			</div>
		);
	}

	// If no employee data is available (e.g., API didn't return anything), show a message
	if (!employeeData) {
		return (
			<div className='text-center py-6'>No employee data found.</div>
		);
	}

	const employeeFields = [
		{
			label: 'Employee Unique ID',
			value: employeeData.employee_unique_id
		},

		{ label: 'Department', value: employeeData.department_name },
		{ label: 'Designation', value: employeeData.designation_name },
		{
			label: 'Date of Birth',
			value: formatDate(employeeData.date_of_birth)
		},
		{ label: 'Gender', value: employeeData.gender },
		{ label: 'Marital Status', value: employeeData.marital_status },
		{ label: 'Phone Number', value: employeeData.phone_number },
		{ label: 'Email', value: employeeData.email },
		{ label: 'Overtime Status', value: employeeData.overtime_status },
		{ label: 'NID', value: employeeData.nid_number },
		{
			label: 'Date of Joining',
			value: formatDate(employeeData.date_of_joining)
		},
		{ label: 'Salary', value: employeeData.salary },
		{ label: 'Present Address', value: employeeData.present_address },
		{
			label: 'Parmanent Address',
			value: employeeData.permanent_address
		},
		{ label: 'Documents', value: employeeData.employee_documents },
		{
			label: 'Date of Termination',
			value: formatDate(employeeData.date_of_termination)
		}
	];

	return (
		<div className='xl:px-4 z-[999999] min-h-screen'>
			<div className='flex flex-col md:flex-row items-center py-6 my-6'>
				<img
					src={employeeData.employee_avatar}
					alt={`${employeeData.first_name} ${employeeData.last_name}`}
					className='rounded-full w-32 h-32 border-4 border-gray-200 shadow-md object-cover'
				/>
				<div className='md:ml-6 mt-4 md:mt-0 text-center md:text-left'>
					<h3 className='text-2xl lg:text-3xl font-semibold text-gray-900'>
						{employeeData.first_name} {employeeData.last_name}
					</h3>
					<p className='text-gray-500 text-base'>
						{employeeData.employment_status}
					</p>
				</div>
			</div>
			{/* Tabs */}
			<div className='mb-6 flex space-x-4 border-b border-gray-200'>
				<button
					className={`py-2 px-4 md:text-lg font-semibold ${
						activeTab === 'details'
							? 'border-b-2 border-blue-600 text-blue-600'
							: 'text-gray-600 hover:text-blue-600'
					}`}
					onClick={() => setActiveTab('details')}
				>
					Details
				</button>
				<button
					className={`py-2 px-4 md:text-lg font-semibold ${
						activeTab === 'attendance'
							? 'border-b-2 border-blue-600 text-blue-600'
							: 'text-gray-600 hover:text-blue-600'
					}`}
					onClick={() => setActiveTab('attendance')}
				>
					Print Attendance
				</button>
			</div>

			{activeTab === 'details' && (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{employeeFields.map((field, index) => (
						<div
							key={index}
							className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col'
						>
							<span className='text-lg font-semibold text-gray-700'>
								{field.label}
							</span>
							<span className='mt-2 text-gray-800'>
								{field.label === 'Documents'
									? employeeData?.employee_documents &&
									  employeeData.employee_documents.length > 0
										? employeeData.employee_documents.map(
												(doc: EmployeeDocuments, index: number) => (
													<div key={index}>
														<a
															href={doc.file_path}
															target='_blank'
															download
															className='text-blue-600 hover:underline'
														>
															{doc.document_name ||
																`Document ${index + 1}`}
														</a>
													</div>
												)
										  )
										: 'N/A'
									: field.value || 'N/A'}
							</span>
						</div>
					))}
				</div>
			)}

			{activeTab === 'attendance' && (
				<PrintAttendance
					{...{
						employeeId: employeeData.id,
						employeeName: `${employeeData.first_name} ${employeeData.last_name}`,
						designation: employeeData.designation_name,
						employeeUniqueId: employeeData.employee_unique_id
					}}
				/>
			)}
		</div>
	);
};

export default ViewEmployee;
