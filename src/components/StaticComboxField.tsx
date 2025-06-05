import { lazy } from 'react';
const ComboBoxStatic = lazy(() => import('@/components/ComboBoxStatic'));
import { FieldErrors, FieldValues } from 'react-hook-form';

interface StaticComboboxFieldProps {
	label: string;
	name: string;
	options: OptionProps[];
	handleDesignationChange: (value: number) => void;
	selectedOption: OptionProps | undefined;
	errors: FieldErrors<FieldValues>;
}

const StaticComboxField = ({
	name,
	label,
	options,
	handleDesignationChange,
	selectedOption,
	errors
}: StaticComboboxFieldProps) => {
	return (
		<div key={name} className='w-full'>
			<label className='text-gray-700 font-medium'>{label}</label>
			<ComboBoxStatic
				{...{
					options: options as OptionProps[],
					showSearch: true,
					onSelect: handleDesignationChange,
					placeholder: selectedOption?.label || `Select ${label}`,
					selectedOption
				}}
			/>
			{errors[name] && (
				<p className='text-red-500 text-sm'>{label} is required.</p>
			)}
		</div>
	);
};

export default StaticComboxField;
