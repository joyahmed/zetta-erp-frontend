import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';
interface TextFieldProps {
	label: string;
	name: string;
	type: string;
	register: UseFormRegister<any>;
	required?: boolean;
	errors: FieldErrors<any>;
}

const TextField = ({
	label,
	name,
	type,
	register,
	required,
	errors
}: TextFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordField = type === 'password';
	const inputType = isPasswordField
		? showPassword
			? 'text'
			: 'password'
		: type;

	return (
		<div className='w-full'>
			<label className='text-gray-700 font-medium'>
				{label}
			</label>
			<div className='relative'>
				<input
					{...register(name, { required })}
					type={inputType}
					className='border border-gray-300 rounded p-2 h-9 w-full pr-10'
				/>
				{isPasswordField && (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 focus:outline-none'
					>
						{showPassword ? <IoIosEyeOff /> : <FaEye />}
					</button>
				)}
			</div>
			{errors[name] && (
				<p className='text-red-500 text-sm'>{label} is required.</p>
			)}
		</div>
	);
};

export default TextField;

// import { FieldErrors, UseFormRegister } from 'react-hook-form';

// interface TextFieldProps {
// 	label: string;
// 	name: string;
// 	type: string;
// 	register: UseFormRegister<any>;
// 	required?: boolean;
// 	errors: FieldErrors<any>;
// }

// const TextField = ({
// 	label,
// 	name,
// 	type,
// 	register,
// 	required,
// 	errors
// }: TextFieldProps) => (
// 	<div className='w-full'>
// 		<label className='text-gray-700 font-medium'>{label}</label>
// 		<input
// 			{...register(name, { required })}
// 			type={type}
// 			className='border border-gray-300 rounded p-2 h-9 w-full'
// 		/>
// 		{errors[name] && (
// 			<p className='text-red-500 text-sm'>{label} is required.</p>
// 		)}
// 	</div>
// );

// export default TextField;
