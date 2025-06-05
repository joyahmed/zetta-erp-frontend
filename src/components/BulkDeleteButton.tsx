import { lazy } from 'react';
const ButtonTooltip = lazy(() => import('./ButtonTooltip'));
const CrudButton = lazy(() => import('./CrudButton'));

interface BulkDeleteButtonProps {
	onClick?: () => void;
}

const BulkDeleteButton = ({ onClick }: BulkDeleteButtonProps) => {
	return (
		<div
			className='relative flex items-center justify-center group w-auto h-10 order-4 lg:order-2 ml-0.5'
			onClick={onClick}
		>
			<CrudButton {...{ type: 'delete', size: 'w-5 h-5' }} />
			<ButtonTooltip {...{ text: 'Bulk Delete', path: 'products' }} />
		</div>
	);
};

export default BulkDeleteButton;
