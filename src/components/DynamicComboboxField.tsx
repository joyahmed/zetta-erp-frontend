import { lazy } from 'react';
const ComboBox = lazy(() => import('@/components/ComboBox'));
import { FieldErrors, FieldValues } from 'react-hook-form';

interface DynamicComboboxFieldProps {
	label: string;
	name: string;
	options?: string[] | OptionProps[];
	handleDepartmentChange: (value: number) => void;
	selectedOption: OptionProps | undefined;
	handleSearchDepartment: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleLoadMoreDepartments: () => Promise<void>;
	departmentInputValue: string;
	errors: FieldErrors<FieldValues>;
}

const DynamicComboboxField = ({
	name,
	label,
	options,
	handleDepartmentChange,
	selectedOption,
	departmentInputValue,
	handleSearchDepartment,
	handleLoadMoreDepartments,
	errors
}: DynamicComboboxFieldProps) => {
	console.log(
		`debug: selectedOption from combobox=>`,
		selectedOption
	);
	return (
		<div key={name} className='w-full'>
			<label className='text-gray-700 font-medium'>{label}</label>
			<ComboBox
				{...{
					options: options as OptionProps[],
					showSearch: true,
					onSelect: handleDepartmentChange,
					placeholder: selectedOption?.label || `Select ${label}`,
					selectedOption,
					inputValue: departmentInputValue,
					handleSearch: handleSearchDepartment,
					handleLoadMore: handleLoadMoreDepartments
				}}
			/>
			{errors[name] && (
				<p className='text-red-500 text-sm'>{label} is required.</p>
			)}
		</div>
	);
};

export default DynamicComboboxField;
