const ButtonTooltip = lazy(
	() => import('@/components/ButtonTooltip')
);
const CrudButton = lazy(() => import('@/components/CrudButton'));
import { useGlobal } from '@/context/GlobalContext';
import { lazy } from 'react';

interface ActionButtonProps {
	route?: string;
	id: number;
	showEdit?: boolean;
	showView?: boolean;
	showDelete?: boolean;
}

const CrudActions = ({
	id,
	route,
	showEdit,
	showView,
	showDelete
}: ActionButtonProps) => {
	const { handleAction } = useGlobal();

	return (
		<div className='flex justify-center space-x-1'>
			{showView !== false ? (
				<div
					className='relative flex items-center justify-center group'
					onClick={() => handleAction('view', id)}
				>
					<CrudButton {...{ type: 'view' }} />
					<ButtonTooltip {...{ text: 'View', path: 'products' }} />
				</div>
			) : null}

			{showEdit !== false ? (
				<>
					<div
						className='relative flex items-center justify-center group'
						onClick={() => handleAction('edit', id)}
					>
						<CrudButton {...{ type: 'edit' }} />
						<ButtonTooltip {...{ text: 'Edit', path: 'products' }} />
					</div>
				</>
			) : null}

			{showDelete !== false ? (
				<div
					className='relative flex items-center justify-center group'
					onClick={() => handleAction('delete', id)}
				>
					<CrudButton {...{ type: 'delete' }} />
					<ButtonTooltip {...{ text: 'Delete', path: 'products' }} />
				</div>
			) : null}
		</div>
	);
};

export default CrudActions;
