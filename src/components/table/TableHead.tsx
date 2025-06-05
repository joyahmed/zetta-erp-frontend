interface TableHeadProps {
	children?: React.ReactNode;
	text?: string;
}

const TableHead = ({ children, text }: TableHeadProps) => {
	return (
		<th className='border-r px-2 py-4 dark:border-sky-400 dark:border-opacity-30 bg-sky-100 text-sky-800'>
			{text ?? children}
		</th>
	);
};

export default TableHead;
