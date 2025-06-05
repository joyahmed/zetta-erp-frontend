const SubmitButton = ({
	text,
	disabled
}: {
	text?: string;
	disabled?: boolean;
}) => {
	return (
		<button
			type='submit'
			className={`w-full bg-sky-600 hover:bg-sky-700 py-3 px-6 rounded-lg text-white font-bold ${
				disabled
					? 'bg-sky-500 hover:bg-sky-600 cursor-not-allowed'
					: 'bg-sky-600 hover:bg-sky-700'
			}`}

		>
			{text || 'Submit'}
		</button>
	);
};

export default SubmitButton;
