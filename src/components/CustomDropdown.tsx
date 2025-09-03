interface DropdownOption<T> {
	value: T;
	label: string;
}

interface CustomDropdownProps<T extends string | number> {
	options: DropdownOption<T>[];
	selected: T;
	onSelect: (value: T) => void;
	dropdownOpen: boolean;
	setDropdownOpen: (open: boolean) => void;
}

function CustomDropdown<T extends string | number>({
	options,
	selected,
	onSelect,
	dropdownOpen,
	setDropdownOpen
}: CustomDropdownProps<T>) {
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const handleSelect = (value: T) => {
		onSelect(value);
		setDropdownOpen(false);
	};

	return (
		<div className='relative inline-block text-left w-40'>
			<button
				type='button'
				onClick={toggleDropdown}
				className='w-full border rounded px-3 py-2 text-left bg-white flex justify-between items-center cursor-pointer'
			>
				<span>
					{options.find(opt => opt.value === selected)?.label ??
						selected}
				</span>
				<span className='ml-2' aria-hidden='true'>
					▼
				</span>
			</button>

			{dropdownOpen && (
				<ul
					className='absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white border border-gray-300 shadow-lg'
					role='listbox'
				>
					{options.map(opt => (
						<li
							key={opt.value}
							className={`cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white ${
								opt.value === selected
									? 'font-semibold bg-blue-100'
									: ''
							}`}
							onClick={() => handleSelect(opt.value)}
							role='option'
							aria-selected={opt.value === selected}
						>
							{opt.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default CustomDropdown;
