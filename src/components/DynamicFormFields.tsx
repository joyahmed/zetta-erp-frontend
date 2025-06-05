interface DynamicFormFieldsProps {
	data: {
		[key: string]: string | number | undefined;
	};
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
}

export const useDynamicFormFields = ({
	data,
	onChange
}: DynamicFormFieldsProps) => {
	const renderField = (field: Field) => {
		const value = data[field.name];

		switch (field.type) {
			case 'textarea':
				return (
					<textarea
						name={field.name}
						onChange={onChange}
						value={value as string}
						className='w-full border rounded px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
						placeholder={`Enter ${field.label}`}
					></textarea>
				);

			default:
				return (
					<input
						type={field.type}
						name={field.name}
						onChange={onChange}
						value={value as string}
						className='w-full border rounded px-4 h-9 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
						placeholder={`Enter ${field.label}`}
					/>
				);
		}
	};
	return { renderField };
};
