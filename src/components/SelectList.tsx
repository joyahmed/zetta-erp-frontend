import React, { useEffect, useRef, useState } from 'react';

interface OptionObject {
	value: string | number;
	label: string;
}

interface SelectListProps {
	name?: string;
	placeholder: string;
	options?: { value: string | number; label: string }[] | string[];
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedValue?: string | number; 
}

const SelectList: React.FC<SelectListProps> = ({
	name,
	options,
	onChange,
	placeholder = 'Select an option',
	selectedValue
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState<string | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const processedOptions: OptionObject[] = Array.isArray(options)
		? typeof options[0] === 'string'
			? (options as string[]).map(str => ({ value: str, label: str }))
			: (options as OptionObject[])
		: [];


	useEffect(() => {
		if (selectedValue != null) {

			const matched = processedOptions.find(
				opt => opt.value === selectedValue
			);
			setSelectedLabel(matched ? matched.label : null);
		} else {
			setSelectedLabel(null);
		}
	}, [selectedValue, processedOptions]);

	const handleSelect = (option: OptionObject) => {
		setSelectedLabel(option.label);
		setIsOpen(false);

		if (onChange && name) {
			const syntheticEvent = {
				target: {
					name,
					value: option.value
				}
			} as unknown as React.ChangeEvent<HTMLInputElement>;

			onChange(syntheticEvent);
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

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative w-full' ref={dropdownRef}>
			<div
				className={`absolute w-full bg-gray-200 rounded-md text-sm transition
          ${isOpen ? 'top-9 z-50' : 'opacity-0 -z-40'}`}
			>
				<ul className='max-h-40 overflow-y-auto border border-gray-400 rounded-md'>
					{processedOptions.length > 0 ? (
						processedOptions.map(opt => (
							<li
								key={opt.value}
								onClick={() => handleSelect(opt)}
								className='flex items-center p-2 hover:bg-blue-900/30 cursor-pointer'
							>
								{opt.label}
							</li>
						))
					) : (
						<li className='p-2 text-gray-500'>No option found</li>
					)}
				</ul>
			</div>

			<div
				className='bg-transparent rounded-md cursor-pointer p-2 flex items-center justify-between border border-gray-400 z-20'
				onClick={handleToggle}
			>
				<span>{selectedLabel || placeholder}</span>
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

export default SelectList;
