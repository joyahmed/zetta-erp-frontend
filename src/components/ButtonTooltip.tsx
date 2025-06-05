interface TooltipProps {
	text: string;
	path: string;
}

const ButtonTooltip = ({ text, path }: TooltipProps) => {
	return (
		<span
			className={`absolute origin-bottom scale-0 rounded-lg px-2.5  py-2 text-xs font-semibold italic opacity-0 transition-all duration-300 group-hover:translate-y-[-1.7rem] group-hover:scale-100 group-hover:opacity-100 z-10 shadow
			${path !== 'select' ? 'text-white bg-blue-900/70' : 'text-amber-200'}
			${
				path === 'categories'
					? 'bottom-[1rem]'
					: path === 'products'
					? 'bottom-[1rem]'
					: path === 'Create Prod'
					? 'bottom-1 min-w-max'
					: path === 'image'
					? 'bottom-2 left-0 text-[11px]'
					: path === 'select'
					? 'gradient-background backdrop-blur-3xl bottom-4 left-0'
					: 'bottom-[3rem]'
			} `}
		>
			{text}
		</span>
	);
};

export default ButtonTooltip;
