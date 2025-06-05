import { useGlobal } from '@/context/GlobalContext';
import { lazy } from 'react';
import { useDynamicForm } from './hooks/useDynamicForm';
const DynamicForm = lazy(() => import('@/components/DynamicForm'));

const DepartmentForm = () => {
	const {
		globalState: { action, id }
	} = useGlobal();

	const departmentFields = [
		{
			label: 'Department Name',
			type: 'text',
			name: 'department_name',
			required: true
		}
	];

	const submitUrl =
		action === 'create'
			? `${window.zettaSettingsData.api_url}hrm/department`
			: `${window.zettaSettingsData.api_url}hrm/department/edit/${id}`;

	const page = 'zetta_erp_department';

	const { formData, handleChange, handleSubmit, errors } =
		useDynamicForm(
			departmentFields,
			`${window.zettaSettingsData.api_url}hrm/department/${id}`,
			submitUrl,
			page,
			'department-form'
		);

	return (
		<div className='py-5'>
			<DynamicForm
				{...{
					text: `${
						action === 'create'
							? 'Create'
							: action === 'view'
							? 'View'
							: action === 'edit'
							? 'Edit'
							: 'Delete'
					} Department`,
					fields: departmentFields,
					data: formData,
					onChange: handleChange,
					onSubmit: handleSubmit,
					errors
				}}
			/>
		</div>
	);
};

export default DepartmentForm;
