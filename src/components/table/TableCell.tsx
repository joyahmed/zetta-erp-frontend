interface TableCellProp {
	text?: string | number | null;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

const TableCell = ({ text, icon, children }: TableCellProp) => {
	return (
		<td className='relative justify-center border-r px-5 py-4 border-sky-500/20 whitespace-nowrap'>
			{text ?? (
				<span className='flex items-center justify-center text-lg'>
					{icon}
				</span>
			)}
			{children}
		</td>
	);
};

export default TableCell;
