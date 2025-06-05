interface ButtonProps {
	text: string;
	onClick?: () => void;
	bulkDelete?: boolean;
}

const CreateButton = ({ onClick, text, bulkDelete }: ButtonProps) => {
	const createClass = `flex items-center justify-center w-full ${
		bulkDelete
			? 'sm:w-[30%] order-2 lg:order-1'
			: 'sm:w-[33%] order-2 lg:order-1'
	} max-w-[400px] border-0 rounded-md px-3 py-2 cursor-pointer bg-sky-600 hover:bg-sky-700 animate-300 mx-auto text-white font-bold hover:text-white text-[16px]`;
	return (
		<button onClick={onClick} className={createClass}>
			Create {text}
		</button>
	);
};

export default CreateButton;
