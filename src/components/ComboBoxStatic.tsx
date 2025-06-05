import React, { useRef, useState } from 'react';

interface ComboBoxProps {
	options?: { label: string; value: number; image?: string }[];
	onSelect?: (value: number) => void;
	showSearch?: boolean;
	placeholder?: string;
}

const ComboBoxStatic: React.FC<ComboBoxProps> = ({
	options,
	onSelect,
	showSearch,
	placeholder = 'Select an option'
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOption, setSelectedOption] = useState<string | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const filteredOptions = options?.filter(option =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelect = (option: { value: number; label: string }) => {
		setSelectedOption(option.label);
		setIsOpen(false);
		if (onSelect) {
			onSelect(option.value);
		}
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleSearch = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchTerm(event.target.value);
	};

	if (typeof document !== 'undefined') {
		document.addEventListener('mousedown', handleClickOutside);
	}

	return (
		<div
			className='relative w-full h-auto min-h-fit'
			ref={dropdownRef}
		>
			{showSearch ? (
				<input
					type='text'
					placeholder='Search...'
					value={searchTerm}
					onChange={handleSearch}
					className='w-full p-2 border bg-transparent border-blue-300 border-opacity-30 focus:outline-none rounded-md mb-2'
				/>
			) : null}
			<div
				className={`absolute w-full bg-gray-200 rounded-md text-sm transition
					${isOpen ? 'top-20 z-50' : 'opacity-0 -z-40'}`}
			>
				<ul className='max-h-40 overflow-y-auto border border-gray-400 rounded-md'>
					{filteredOptions ? (
						filteredOptions.length > 0 ? (
							filteredOptions?.map(option => (
								<li
									key={option.value}
									onClick={() => handleSelect(option)}
									className='flex items-center p-2 hover:bg-blue-900/30 cursor-pointer'
								>
									{option?.image ? (
										<img
											src={option.image}
											width={50}
											height={50}
											className='rounded-full w-10 h-10 mr-2'
										/>
									) : null}
									{option.label}
								</li>
							))
						) : (
							<li className='p-2 text-gray-500'>No option found</li>
						)
					) : (
						<li className='p-2 text-gray-500'>No option found</li>
					)}
				</ul>
			</div>

			<div
				className='bg-transparent rounded-md cursor-pointer p-2 flex items-center justify-between border border-gray-400 z-20 '
				onClick={handleToggle}
			>
				<span>{selectedOption || placeholder}</span>
				<svg
					className={`w-4 h-4 text-gray-600 transition-transform `}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</div>
		</div>
	);
};

export default ComboBoxStatic;
