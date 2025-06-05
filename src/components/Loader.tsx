interface LoaderProps {
	text?: string;
}

const Loader = ({ text }: LoaderProps) => {
	return (
		<div className='relative flex items-center justify-center h-32 w-32'>
			<div className='absolute animate-loader-border rounded-full h-32 w-32 border-b-2 border-sky-600 z-0 shadow-[15px]'></div>
			<div className='absolute z-1 tracking-wider animate-loader-text text-sky-600 text-xl font-bold'>
				{text ?? 'Loading'}
			</div>
		</div>
	);
};

export default Loader;
