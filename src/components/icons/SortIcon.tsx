import DropdownIcon from '@/components/icons/DropdownIcon';

interface SortProp {
	sortOrder: string;
}

const SortIcon = ({ sortOrder }: SortProp) => {
	return (
		<span
			className={`inline-flex items-center justify-center ml-2  w-4 h-full
    ${
			sortOrder === 'asc'
				? 'rotate-0 animation-300'
				: 'rotate-180 animation-300'
		}
    `}
		>
			<DropdownIcon className='text-sky-600 z-50' />
		</span>
	);
};

export default SortIcon;
