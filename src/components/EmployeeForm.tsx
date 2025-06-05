import { FormEvent, lazy } from 'react';
import { useEmployeeForm } from './hooks/useEmployeeForm';

const EmployeeFormBody = lazy(() => import('./EmployeeFormBody'));
const TabbedFormTabs = lazy(
	() => import('@/components/TabbedFormTabs')
);

const EmployeeForm = () => {
	const {
		action,
		employeeTabs,
		activeTab,
		onSubmit,
		employeeFields,
		register,
		watch,
		getValues,
		setValue,
		showSubmitCondition,
		openMediaUploader,
		errors,
		activeTabIndex,
		handleNextTab,
		handlePrevTab,
		handleTabChange,
		handleLoadMoreDepartments,
		departmentInputValue,
		selectedDepartment,
		handleSearchDepartment
	} = useEmployeeForm();

	const selectedDepartmentId = getValues('department_id'); // ✅ Avoids unnecessary re-renders
	const selectedDesignationId = getValues('designation_id');

	// ✅ Handle department selection and reset designation when changed
	const handleDepartmentChange = (value: number) => {
		setValue('department_id', value, { shouldValidate: true });
		setValue('designation_id', null); // Reset designation
	};

	// ✅ Handle designation selection
	const handleDesignationChange = (value: number) => {
		setValue('designation_id', value, { shouldValidate: true });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div className='flex flex-col items-center justify-center py-5'>
			<h1 className='font-bold text-2xl text-sky-600 uppercase mb-10 text-center'>
				{action === 'create' ? 'Create' : 'Edit'} Employee
			</h1>

			<TabbedFormTabs
				{...{ tabItems: employeeTabs, activeTab, handleTabChange }}
			/>

			<EmployeeFormBody
				{...{
					handleSubmit,
					employeeFields,
					activeTab,
					watch,
					selectedDepartmentId,
					selectedDepartment,
					handleDepartmentChange,
					handleDesignationChange,
					departmentInputValue,
					handleSearchDepartment,
					handleLoadMoreDepartments,
					selectedDesignationId,
					errors,
					setValue,
					getValues,
					register,
					activeTabIndex,
					handleNextTab,
					handlePrevTab,
					tabsLength: employeeTabs.length,
					showSubmitCondition,
					openMediaUploader
				}}
			/>
		</div>
	);
};

export default EmployeeForm;
