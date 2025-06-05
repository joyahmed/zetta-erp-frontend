const TabbedFormFooter = lazy(() => import('@/components/TabbedFormFooter'));
import React, { FormEvent, lazy } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form';
const EmployeeFieldsRender = lazy(() => import('./EmployeeFieldsRender'));

interface EmployeeFormBody {
	handleSubmit: (e: FormEvent) => void;
	employeeFields: EmployeeField[];
	activeTab: number;
	watch: UseFormWatch<FieldValues>;
	selectedDepartmentId: number;
	selectedDepartment: { id: number; department_name: string };
	handleDepartmentChange: (value: number) => void;
	handleDesignationChange: (value: number) => void;
	departmentInputValue: string;
	handleSearchDepartment: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleLoadMoreDepartments: () => Promise<void>;
	errors: FieldErrors<FieldValues>;
	selectedDesignationId: number;
	setValue: UseFormSetValue<FieldValues>;
	register: UseFormRegister<FieldValues>;
	activeTabIndex: number;
	handleNextTab: (e: FormEvent) => void;
	handlePrevTab: (e: FormEvent) => void;
	tabsLength: number;
	showSubmitCondition: boolean;
	openMediaUploader: (field: string) => void;
}

const EmployeeFormBody = ({
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
	register,
	activeTabIndex,
	handleNextTab,
	handlePrevTab,
	tabsLength,
	showSubmitCondition,
	openMediaUploader
}: EmployeeFormBody) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center justify-between w-full'
		>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3 pt-5 w-full h-full md:min-h-[18rem]'>
				<EmployeeFieldsRender
					{...{
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
						register,
						openMediaUploader
					}}
				/>
			</div>

			<TabbedFormFooter
				{...{
					handlePrevTab,
					handleNextTab,
					activeTabIndex,
					tabsLength,
					showSubmitCondition
				}}
			/>
		</form>
	);
};

export default EmployeeFormBody;
