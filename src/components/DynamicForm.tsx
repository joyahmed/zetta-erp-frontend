import { lazy } from 'react';
import { useDynamicFormFields } from './DynamicFormFields';
const SubmitButton = lazy(() => import('./SubmitButton'));

const DynamicForm = ({
	text,
	fields,
	data,
	onChange,
	onSubmit,
	errors,
	extraNode,
	disabled
}: DynamicFormProps) => {
	const { renderField } = useDynamicFormFields({
		data,
		onChange
	});

	const gridLayout =
		fields.length === 1
			? 'grid-cols-1'
			: 'grid-cols-1 sm:grid-cols-2';
	return (
		<form onSubmit={onSubmit} className='space-y-6'>
			<h1 className='font-bold text-2xl text-sky-600 uppercase mb-6 text-center'>
				{text}
			</h1>

			{extraNode ? extraNode : null}

			<div className={`grid ${gridLayout} gap-6`}>
				{fields.map((field, index) => (
					<div key={index} className='w-full'>
						<label className='block text-gray-700 font-medium mb-2'>
							{field.label}
						</label>
						{renderField(field)}
						{errors[field.name] && (
							<span className='text-red-500 text-sm mt-1 block'>
								{errors[field.name]}
							</span>
						)}
					</div>
				))}
			</div>
			<SubmitButton {...{ disabled }} />
		</form>
	);
};

export default DynamicForm;
