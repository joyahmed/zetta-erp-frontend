interface DashboardDataComponentProps {
	text: string;
	children: React.ReactNode;
	colspan: string;
}

const DashboardDataComponent = ({
	text,
	children,
	colspan
}: DashboardDataComponentProps) => {
	return (
		<div
			className={`${colspan} flex flex-col items-center justify-center bg-gray-100 p-6 shadow-md rounded-lg`}
		>
			<h3 className='text-lg font-semibold mb-3 text-sky-600'>
				{text}
			</h3>
			{children}
		</div>
	);
};

export default DashboardDataComponent;
