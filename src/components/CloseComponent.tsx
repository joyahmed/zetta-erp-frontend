const CloseComponent = () => {
	return (
		<div className='flex items-center justify-center h-6 w-6 bg-red-600 backdrop-blur-xl hover:hue-rotate-30 rounded-full z-[10] cursor-pointer'>
			<span className='hover:scale-110 hover:rotate-180 transition-all duration-300 ease-in-out'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-4 h-4 text-white'
				>
					<path d='M18 6 6 18' />
					<path d='m6 6 12 12' />
				</svg>
			</span>
		</div>
	);
};

export default CloseComponent;
