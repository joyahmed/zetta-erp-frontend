import useHandleSearch from '@/components/hooks/useHandleSearch';
import { useMediaUploaderWithForm } from '@/components/hooks/useMediaUploaderWithForm';
import { useTabbedForm } from '@/components/hooks/useTabbedForm';
import { useGlobal } from '@/context/GlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	getEmployeeFields,
	getEmployeeTabs
} from '../employeeFormItems';
import { useHandleSubmit } from './useHandleSubmit';

interface ItemStateProps {
	employee: EmployeeProps;
	departments: DepartmentProps[];
	filteredDepartments: DepartmentProps[];
	selectedDepartment: { id: number; department_name: string };
	designations: DesignationProps[];
	filteredDesignations: DesignationProps[];
	totalItemsDepartments: number;
	totalItemsDesignations: number;
	departmentPage: number;
	designationPage: number;
	searchTextDepartment: string;
}

export const useEmployeeForm = () => {
	const { globalState } = useGlobal();
	const { id, action } = globalState;
	const [query, setQuery] = useState('');
	const [loginInfo, setLoginInfo] = useState<{
		user_login: string;
		user_pass: string;
	} | null>(null);
	const [itemState, setItemState] = useState<ItemStateProps>({
		employee: {} as EmployeeProps,
		departments: [],
		filteredDepartments: [],
		selectedDepartment: { id: 0, department_name: '' },
		designations: [],
		filteredDesignations: [],
		totalItemsDepartments: 0,
		totalItemsDesignations: 0,
		departmentPage: 1,
		designationPage: 1,
		searchTextDepartment: ''
	});

	const {
		employee,
		searchTextDepartment,
		departmentPage,
		departments,
		selectedDepartment,
		filteredDepartments,
		filteredDesignations,
		totalItemsDepartments
	} = itemState;

	// Form State
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onSubmit', // Validate on submit
		reValidateMode: 'onChange', // Re-validate on change
		shouldFocusError: true, // Focus on the first error field
		shouldUnregister: false
	});

	// Media Upload
	const { openMediaUploader } = useMediaUploaderWithForm(
		watch,
		setValue
	);

	const employeeFields = getEmployeeFields(
		filteredDepartments,
		filteredDesignations,
		action
	);

	const selectedDepartmentId = watch('department_id');
	const selectedDesignationId = watch('designation_id');

	const fetchDepartments = useCallback(
		async (reset = false) => {
			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}hrm/department?index=${
						reset ? 1 : departmentPage
					}&query=${query}`,
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
				if (data?.data) {
					const newPage = searchTextDepartment
						? 1
						: departmentPage + 1;
					setItemState(prev => ({
						...prev,
						departments: data?.data,

						filteredDepartments: reset
							? data?.data
							: [...prev.filteredDepartments, ...data?.data],
						totalItemsDepartments: data?.total_items,
						departmentPage: newPage
					}));
				}
			} catch (error) {
				console.error('Error fetching departments:', error);
			}
		},
		[query, departmentPage]
	);

	const fetchDepartment = async () => {
		try {
			const response = await fetch(
				`${window.zettaSettingsData.api_url}hrm/department/${employee.department_id}`,
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
			if (data) {
				console.log(`debug: data =>`, data);
				return data;
			}
		} catch (error) {
			console.error('Error fetching departments:', error);
		}
	};

	const fetchEmployee = async () => {
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
			setItemState(prev => ({
				...prev,
				employee: data
			}));
			return { data };
		} catch (error) {
			//console.error('Error fetching employees:', error);
			return undefined;
		}
	};

	useEffect(() => {
		if (searchTextDepartment) {
			setItemState(prev => ({
				...prev,
				departmentPage: 1
			}));
		}
	}, [searchTextDepartment]);

	const employeeTabs = getEmployeeTabs(action);

	const {
		handleTabChange,
		handleNextTab,
		handlePrevTab,
		activeTab,
		setActiveTab
	} = useTabbedForm({
		tabItems: employeeTabs,
		trigger,
		activeIndex: action === 'create' ? 1 : 2
	});

	useEffect(() => {
		setActiveTab(action === 'create' ? 1 : 2);
	}, [action]);

	const showSubmitCondition =
		action === 'create' ? activeTab === employeeTabs.length : true;

	const formData = getValues();
	const submitUrl =
		action === 'create'
			? `${window.zettaSettingsData.api_url}hrm/employee`
			: `${window.zettaSettingsData.api_url}hrm/employee/edit/${id}`;

	const { onSubmit } = useHandleSubmit({
		submitUrl,
		method: action === 'create' ? 'POST' : 'PUT',
		formData,
		page: 'zetta_erp_employee'
	});

	useEffect(() => {
		const fetchAndSetDepartment = async () => {
			if (employee) {
				(Object.keys(employee) as Array<keyof EmployeeProps>).forEach(
					key => {
						setValue(key, employee[key]); // ✅ TypeScript-safe property access
					}
				);

				// ✅ Set department FIRST, then set designation
				if (employee.department_id) {
					setValue('department_id', employee.department_id, {
						shouldValidate: true
					});

					try {
						const data = await fetchDepartment(); // ✅ Await the department fetch

						if (data) {
							setTimeout(() => {
								setItemState(prev => ({
									...prev,
									selectedDepartment: data.department,
									filteredDesignations: data.designations || []
								}));
							}, 100);
						}

						// ✅ Ensure designation is set AFTER department is updated
						if (employee.designation_id) {
							setTimeout(() => {
								setValue('designation_id', employee.designation_id, {
									shouldValidate: true
								});
							}, 150);
						}
					} catch (error) {
						console.error('Error fetching department:', error);
					}
				}
			}
		};

		fetchAndSetDepartment();
	}, [employee, departments, setValue]);

	const fetchDesignationsByDepartment = useCallback(
		async (departmentId: number) => {
			if (!departmentId) return;

			try {
				const response = await fetch(
					`${window.zettaSettingsData.api_url}hrm/department/${departmentId}`,
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

				if (data) {
					setItemState(prev => ({
						...prev,
						filteredDesignations: data.designations || []
					}));
				}
			} catch (error) {
				console.error(
					`Error fetching designations for department ${departmentId}:`,
					error
				);
			}
		},
		[selectedDepartmentId]
	);

	useEffect(() => {
		if (!selectedDepartmentId) {
			setItemState(prev => ({
				...prev,
				filteredDesignations: []
			}));
			setValue('designation_id', null); // ✅ Reset designation
			return;
		}

		fetchDesignationsByDepartment(selectedDepartmentId);
		setValue('designation_id', null);
	}, [selectedDepartmentId, fetchDesignationsByDepartment]);

	// Find the index of the current active tab
	const activeTabIndex = employeeTabs.findIndex(
		tab => tab?.id === activeTab
	);

	const departMentArray = searchTextDepartment
		? departments
		: filteredDepartments;

	const handleLoadMoreDepartments = async () => {
		if (departMentArray.length >= totalItemsDepartments) return;
		setItemState(prev => ({
			...prev,
			departmentPage: prev.departmentPage + 1
		}));
		await fetchDepartments();
	};

	const {
		handleSearch: handleSearchDepartment,
		inputValue: departmentInputValue
	} = useHandleSearch({
		setItemState,
		setQuery
	});

	useEffect(() => {
		fetchDepartments(true);
	}, [query]);

	useEffect(() => {
		fetchEmployee();
	}, [id]);

	useEffect(() => {
		if (employee) {
			setValue('user_login', employee.user_login ?? '');
			setValue('user_pass', employee.user_pass ?? '');
			setValue('first_name', employee.first_name ?? '');
			setValue('last_name', employee.last_name ?? '');
			setValue('gender', employee.gender ?? '');
			setValue('marital_status', employee.marital_status ?? '');
			setValue('date_of_birth', employee.date_of_birth ?? '');
			setValue('phone_number', employee.phone_number ?? '');
			setValue('email', employee.email ?? '');
			setValue('present_address', employee.present_address ?? '');
			setValue('permanent_address', employee.permanent_address ?? '');
			setValue(
				'employee_unique_id',
				employee.employee_unique_id ?? ''
			);
			setValue('date_of_joining', employee.date_of_joining ?? '');
			setValue('department_id', employee.department_id ?? null);
			setValue('designation_id', employee.designation_id ?? null);
			setValue(
				'employment_status',
				employee.employment_status ?? null
			);
			setValue('salary', employee.salary ?? null);
			setValue('overtime_status', employee.overtime_status ?? null);
			setValue('nid_number', employee.nid_number ?? null);
			setValue(
				'date_of_termination',
				employee.date_of_termination ?? null
			);
			setValue('employee_avatar', employee.employee_avatar ?? null);
			setValue(
				'employee_documents',
				employee.employee_documents ?? null
			);
		}
	}, [employee, setValue]);

	return {
		action,
		employeeTabs,
		activeTab,
		handleSubmit,
		onSubmit,
		employeeFields,
		register,
		openMediaUploader,
		watch,
		getValues,
		setValue,
		showSubmitCondition,
		errors,
		activeTabIndex,
		handleNextTab,
		handlePrevTab,
		handleTabChange,
		handleLoadMoreDepartments,
		departmentInputValue,
		handleSearchDepartment,
		selectedDepartmentId,
		selectedDepartment,
		selectedDesignationId
	};
};
