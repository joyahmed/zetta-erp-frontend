interface LabelProps {
	text: string;
	peerClassName?: string;
}

const Label = ({ text, peerClassName }: LabelProps) => {
	return (
		<label
			className={`
				 absolute
				 left-2
				 -z-40
				 opacity-0
				 text-sm
				 text-transparent
				 transition-all
				 peer-placeholder-shown:top-4
				 peer-placeholder-shown:left-2
				 placeholder-shown:text-transparent
				 peer-placeholder-shown:text-[14px]
				 peer-focus:opacity-100
				 peer-focus:z-50
				 peer-focus:sm-top-0
				 peer-focus:-top-6
				 peer-focus:left-2
				 peer-focus:text-sm
			 peer-focus:text-sky-700/70
			 peer-focus:dark:text-sky-700/90
			 ${peerClassName}
			 `}
		>
			{text}
		</label>
	);
};

export default Label;
