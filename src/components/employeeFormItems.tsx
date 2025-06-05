export const getEmployeeFields = (
	filteredDepartments: DepartmentProps[],
	filteredDesignations: DesignationProps[],
	action: string
) => {
	const fields = [
		// ✅ Tab 1 (Only added if isEmployeeFeatureEnabled is true)
		{
			tab: 1,
			label: 'Username',
			type: 'text',
			name: 'user_login',
			required: true
		},
		{
			tab: 1,
			label: 'Password',
			type: 'password',
			name: 'user_pass',
			required: true
		},
		//✅ Tab 2: Personal Details
		{
			tab: 2,
			label: 'First Name',
			type: 'text',
			name: 'first_name',
			required: true
		},
		{
			tab: 2,
			label: 'Last Name',
			type: 'text',
			name: 'last_name',
			required: true
		},
		{
			tab: 2,
			label: 'Gender',
			type: 'custom-select',
			name: 'gender',
			options: ['Male', 'Female', 'Other'],
			required: true
		},
		{
			tab: 2,
			label: 'Marital Status',
			type: 'custom-select',
			name: 'marital_status',
			options: ['Single', 'Married', 'Divorced', 'Widowed'],
			required: true
		},
		{
			tab: 2,
			label: 'Date of Birth',
			type: 'date',
			name: 'date_of_birth',
			required: true
		},

		// ✅ Tab 3: Contact Information
		{
			tab: 3,
			label: 'Phone Number',
			type: 'tel',
			name: 'phone_number',
			required: true
		},
		{
			tab: 3,
			label: 'Email Address',
			type: 'email',
			name: 'email',
			required: true
		},
		{
			tab: 3,
			label: 'Present Address',
			type: 'textarea',
			name: 'present_address',
			required: true
		},
		{
			tab: 3,
			label: 'Permanent Address',
			type: 'textarea',
			name: 'permanent_address',
			required: true
		},

		// ✅ Tab 4: Employment Details
		{
			tab: 4,
			label: 'Employee Unique ID',
			type: 'text',
			name: 'employee_unique_id',
			required: true
		},
		{
			tab: 4,
			label: 'Date of Joining',
			type: 'date',
			name: 'date_of_joining',
			required: true
		},
		{
			tab: 4,
			label: 'Department',
			type: 'combobox-dynamic',
			name: 'department_id',
			options: filteredDepartments.map((item: DepartmentProps) => ({
				label: item.department_name,
				value: Number(item.id), // ✅ Ensure it's a number
				image: ''
			}))
		},
		{
			tab: 4,
			label: 'Designation',
			type: 'combobox-static',
			name: 'designation_id',
			options: filteredDesignations.map((item: DesignationProps) => ({
				label: item.designation_name,
				value: Number(item.id), // ✅ Ensure it's a number
				image: ''
			}))
		},
		{
			tab: 4,
			label: 'Employment Status',
			type: 'custom-select',
			name: 'employment_status',
			options: ['Full Time', 'Part Time', 'Internship', 'Remote'],
			required: true
		},

		// ✅ Tab 5: Salary & Work
		{
			tab: 5,
			label: 'Salary',
			type: 'number',
			name: 'salary',
			required: true
		},
		{
			tab: 5,
			label: 'Overtime Status',
			type: 'custom-select',
			name: 'overtime_status',
			options: ['Yes', 'No'],
			required: true
		},

		// ✅ Tab 6: Legal & Identity
		{
			tab: 6,
			label: 'NID',
			type: 'text',
			name: 'nid_number',
			required: true
		},
		{
			tab: 6,
			label: 'Date of Termination',
			type: 'date',
			name: 'date_of_termination'
		},

		// ✅Tab 7: Documents
		{
			tab: 7,
			label: 'Avatar',
			type: 'button',
			name: 'employee_avatar',
			required: true
		},
		{
			tab: 7,
			label: 'Documents',
			type: 'button',
			name: 'employee_documents',
			required: true
		}
	];

	if (action === 'edit') {
		return fields.filter(field => field.tab !== 1);
	}

	return fields;
};

export const getEmployeeTabs = (action: string) => {
	// Define all possible tabs with stable IDs.
	const allTabs = [
		{ id: 1, title: 'User Login' },
		{ id: 2, title: 'Personal Details' },
		{ id: 3, title: 'Contact Information' },
		{ id: 4, title: 'Employment Details' },
		{ id: 5, title: 'Salary & Work' },
		{ id: 6, title: 'Legal & Identity' },
		{ id: 7, title: 'Documents' }
	];

	// Remove tab 1 if we are editing
	if (action === 'edit') {
		return allTabs.filter(tab => tab.id !== 1);
	}

	return allTabs;
};
