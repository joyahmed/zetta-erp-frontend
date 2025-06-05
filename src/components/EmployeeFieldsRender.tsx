import { HEADERS } from '@/utils/get-headers';
import React, { lazy } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form';
const DynamicComboboxField = lazy(
	() => import('./DynamicComboboxField')
);
const StaticComboxField = lazy(
	() => import('@/components/StaticComboxField')
);
const SelectField = lazy(() => import('@/components/SelectField'));
const TextAreaField = lazy(
	() => import('@/components/TextAreaField')
);
const ButtonField = lazy(() => import('./ButtonField'));
const TextField = lazy(() => import('@/components/TextField'));

interface EmployeeFieldsRenderProps {
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
	openMediaUploader: (field: string) => void;
}

const EmployeeFieldsRender = ({
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
}: EmployeeFieldsRenderProps) => {
	const handleRemoveFile = async (field: string, index: number) => {
		const currentValue = watch(field);
		if (!Array.isArray(currentValue)) return;

		const doc = currentValue[index];
		const updated = currentValue.filter(
			(_: any, i: number) => i !== index
		);

		setValue(field, updated, { shouldValidate: true });
		if (doc?.url || doc?.file_path) {
			try {
				await fetch(
					`${window.zettaSettingsData.api_url}zetta/storage/delete`,
					{
						method: 'POST',
						headers: HEADERS,
						body: JSON.stringify({
							file_url: doc.url || doc.file_path
						}),
						credentials: 'include'
					}
				);
			} catch (err) {
				console.error('Error deleting file from server:', err);
			}
		}
	};

	return (
		<>
			{employeeFields
				.filter(field => field.tab === activeTab)
				.map(({ label, type, name, options, required }) => {
					const fieldValue = watch(name);

					/** ✅ Handle Different Field Types Properly */
					switch (type) {
						case 'combobox-dynamic': {
							const selectedOption =
								selectedDepartment && selectedDepartment.id
									? {
											label: selectedDepartment.department_name,
											value: selectedDepartment.id
									  }
									: (options as OptionProps[]).find(
											option =>
												Number(option.value) ===
												Number(selectedDepartmentId)
									  );

							return (
								<React.Fragment key={name}>
									<DynamicComboboxField
										{...{
											name,
											label,
											options,
											handleDepartmentChange,
											selectedOption,
											departmentInputValue,
											handleSearchDepartment,
											handleLoadMoreDepartments,
											errors
										}}
									/>
								</React.Fragment>
							);
						}
						case 'combobox-static': {
							const formattedOptions: OptionProps[] = Array.isArray(
								options
							)
								? options.map(opt =>
										typeof opt === 'string'
											? { label: opt, value: opt.length, image: '' }
											: opt
								  )
								: [];

							const selectedOption = formattedOptions.find(
								option =>
									Number(option.value) ===
									Number(selectedDesignationId)
							);
							return (
								<React.Fragment key={name}>
									<StaticComboxField
										{...{
											name,
											label,
											options: formattedOptions,
											handleDesignationChange,
											selectedOption,
											errors
										}}
									/>
								</React.Fragment>
							);
						}
						case 'custom-select': {
							const handleSelectChange = (
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								setValue(name, e.target.value, {
									shouldValidate: true
								});
							};
							const formattedOptions: string[] = Array.isArray(
								options
							)
								? (options as string[])
								: [];

							return (
								<React.Fragment key={name}>
									<SelectField
										{...{
											label,
											name,
											options: formattedOptions,
											errors,
											fieldValue,
											handleSelectChange
										}}
									/>
								</React.Fragment>
							);
						}
						case 'textarea':
							return (
								<React.Fragment key={name}>
									<TextAreaField
										{...{
											label,
											name,
											register,
											required,
											errors
										}}
									/>
								</React.Fragment>
							);
						case 'button':
							return (
								<ButtonField
									{...{
										label,
										name,
										watch,
										openMediaUploader,
										handleRemoveFile
									}}
								/>
							);
						default:
							return (
								<React.Fragment key={name}>
									<TextField
										{...{
											label,
											name,
											type,
											register,
											required,
											errors
										}}
									/>
								</React.Fragment>
							);
					}
				})}
		</>
	);
};
export default EmployeeFieldsRender;
