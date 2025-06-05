import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface TextAreaFieldProps {
	label: string;
	name: string;
	register: UseFormRegister<any>;
	required?: boolean;
	errors: FieldErrors<any>;
}

const TextAreaField = ({
	label,
	name,
	register,
	required,
	errors
}: TextAreaFieldProps) => (
	<div className='w-full'>
		<label className='text-gray-700 font-medium'>{label}</label>
		<textarea
			{...register(name, { required })}
			className='border border-gray-300 rounded p-2 w-full h-20'
		/>
		{errors[name] && (
			<p className='text-red-500 text-sm'>{label} is required.</p>
		)}
	</div>
);

export default TextAreaField;
