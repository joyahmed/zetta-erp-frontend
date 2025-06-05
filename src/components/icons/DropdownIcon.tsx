const DropdownIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={3}
			stroke='currentColor'
			className={className} // Apply class only to SVG
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 8.25l-7.5 7.5-7.5-7.5'
				className={className} // Apply class only to SVG
			/>
		</svg>
	);
};

export default DropdownIcon;
