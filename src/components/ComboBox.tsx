import React, {
	ChangeEvent,
	useEffect,
	useRef,
	useState
} from 'react';

interface ComboBoxProps {
	options?: OptionProps[];
	onSelect?: (value: number) => void;
	showSearch?: boolean;
	placeholder?: string;
	searchtext?: string;
	handleLoadMore?: () => void;
	inputValue?: string;
	handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ComboBox = ({
	options = [],
	onSelect,
	showSearch,
	placeholder = 'Select an option',
	handleLoadMore,
	inputValue,
	searchtext,
	handleSearch
}: ComboBoxProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOption, setSelectedOption] = useState<string | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const lastItemRef = useRef<HTMLLIElement | null>(null); // Reference for last item

	const filteredOptions = options?.filter(option =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Function to handle selection
	const handleSelect = (option: { value: number; label: string }) => {
		setSelectedOption(option.label);
		setIsOpen(false);
		if (onSelect) {
			onSelect(option.value);
		}
	};

	// Handle Dropdown Toggle
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	// Handle Click Outside
	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	// Hover Effect on Last Item to Load More
	useEffect(() => {
		if (lastItemRef.current) {
			const lastItem = lastItemRef.current;

			const handleHover = () => {
				if (handleLoadMore) {
					handleLoadMore();
				}
			};
			lastItem.addEventListener('mouseover', handleHover);
			return () =>
				lastItem.removeEventListener('mouseover', handleHover);
		}
	}, [filteredOptions, handleLoadMore]);

	// Add Click Outside Listener
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			className='relative w-full h-auto min-h-fit'
			ref={dropdownRef}
		>
			{showSearch && (
				<input
					type='text'
					placeholder={searchtext || 'Search...'}
					value={inputValue}
					onChange={handleSearch}
					className='w-full h-9 p-2 border bg-transparent border-blue-300 border-opacity-30 focus:outline-none rounded-md mb-2'
				/>
			)}

			{/* Dropdown List */}
			<div
				className={`absolute w-full bg-gray-200 rounded-md text-sm transition ${
					isOpen ? 'top-20 z-50' : 'opacity-0 -z-40'
				}`}
			>
				<ul className='max-h-40 overflow-y-auto border border-gray-400 rounded-md  no-scrollbar'>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, index) => (
							<li
								key={option.value}
								onClick={() => handleSelect(option)}
								className='flex items-center p-2 hover:bg-blue-900/30 cursor-pointer'
								ref={
									index === filteredOptions.length - 1
										? lastItemRef
										: null
								} // Attach ref to last item
							>
								{option?.image && (
									<img
										src={option.image}
										width={50}
										height={50}
										className='rounded-full w-10 h-10 mr-2'
									/>
								)}
								{option.label}
							</li>
						))
					) : (
						<li className='p-2 text-gray-500'>No option found</li>
					)}
				</ul>
			</div>

			{/* Dropdown Button */}
			<div
				className='bg-transparent rounded-md cursor-pointer p-2 flex items-center justify-between border border-gray-400 z-20'
				onClick={handleToggle}
			>
				<span>{selectedOption || placeholder}</span>
				<svg
					className='w-4 h-4 text-gray-600 transition-transform'
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

export default ComboBox;
