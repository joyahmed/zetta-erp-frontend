'use client';

interface CrudButtonProps {
	type: string;
	size?: string;
}

const CrudButton = ({ type, size }: CrudButtonProps) => {
	const className =
		type === 'view'
			? 'bg-indigo-300 hover:bg-indigo-400'
			: type === 'edit'
			? 'bg-sky-500 hover:bg-sky-600'
			: type === 'delete'
			? 'bg-red-600 hover:bg-red-700'
			: type === 'barcode'
			? 'bg-green-600 hover:bg-red-700'
			: '';

	const getIcon = () => {
		if (type === 'view') {
			return (
				<svg
					className='w-4 h-4 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
					/>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
					/>
				</svg>
			);
		}

		if (type === 'edit') {
			return (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='w-3.5 h-3.5 text-white'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
					/>
				</svg>
			);
		}

		if (type === 'delete') {
			return (
				<svg
					className={`${size ? size : 'w-3.5 h-3.5'} text-white`}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
					/>
				</svg>
			);
		}
		if (type === 'barcode') {
			return (
				<svg
					fill='#fff'
					version='1.1'
					id='Capa_1'
					width='800px'
					height='800px'
					viewBox='0 0 91.334 91.334'
					xmlSpace='preserve'
					className='w-3.5 h-3.5 text-white'
				>
					<g>
						<g>
							<path
								d='M6.834,11.549H1c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h5.834c0.552,0,1-0.448,1-1V12.549
			C7.834,11.997,7.386,11.549,6.834,11.549z'
							/>
							<path
								d='M62.043,11.549h-4.168c-0.553,0-1,0.448-1,1v66.236c0,0.552,0.447,1,1,1h4.168c0.553,0,1-0.448,1-1V12.549
			C63.043,11.997,62.596,11.549,62.043,11.549z'
							/>
							<path
								d='M17,11.549h-4c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1V12.549
			C18,11.997,17.552,11.549,17,11.549z'
							/>
							<path
								d='M90.334,11.549h-4c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h4c0.553,0,1-0.448,1-1V12.549
			C91.334,11.997,90.887,11.549,90.334,11.549z'
							/>
							<path
								d='M81.167,11.549h-2.724c-0.553,0-1,0.448-1,1v66.236c0,0.552,0.447,1,1,1h2.724c0.552,0,1-0.448,1-1V12.549
			C82.167,11.997,81.719,11.549,81.167,11.549z'
							/>
							<path
								d='M51.875,11.549h-4c-0.553,0-1,0.448-1,1v66.236c0,0.552,0.447,1,1,1h4c0.552,0,1-0.448,1-1V12.549
			C52.875,11.997,52.427,11.549,51.875,11.549z'
							/>
							<path
								d='M42.167,11.549h-2.5c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h2.5c0.552,0,1-0.448,1-1V12.549
			C43.167,11.997,42.719,11.549,42.167,11.549z'
							/>
							<path
								d='M73.523,11.549H71.98c-0.553,0-1,0.448-1,1v66.236c0,0.552,0.447,1,1,1h1.543c0.552,0,1-0.448,1-1V12.549
			C74.523,11.997,74.076,11.549,73.523,11.549z'
							/>
							<path
								d='M33.667,11.549h-4c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1V12.549
			C34.667,11.997,34.219,11.549,33.667,11.549z'
							/>
							<path
								d='M23.667,11.549h-1c-0.552,0-1,0.448-1,1v66.236c0,0.552,0.448,1,1,1h1c0.552,0,1-0.448,1-1V12.549
			C24.667,11.997,24.219,11.549,23.667,11.549z'
							/>
							<path
								d='M67.227,11.549h-0.363c-0.551,0-1,0.448-1,1v66.236c0,0.552,0.449,1,1,1h0.363c0.551,0,1-0.448,1-1V12.549
			C68.227,11.997,67.777,11.549,67.227,11.549z'
							/>
						</g>
					</g>
				</svg>
			);
		}
	};
	return (
		<button
			className={`flex items-center justify-center transition ${
				size ? 'w-10 h-10' : 'h-8 w-8'
			} rounded   outline-0
      ${className}
      `}
		>
			{getIcon()}
		</button>
	);
};

export default CrudButton;
