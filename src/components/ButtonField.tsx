import { lazy } from 'react';
const CloseIcon = lazy(() => import('@/components/icons/CloseIcon'));

interface ButtonFieldProps {
	label: string;
	name: string;
	watch: any;
	openMediaUploader: (field: string) => void;
	handleRemoveFile: (field: string, index: number) => Promise<void>;
}

const ButtonField = ({
	label,
	name,
	watch,
	openMediaUploader,
	handleRemoveFile
}: ButtonFieldProps) => {
	return (
		<div>
			<button
				type='button'
				onClick={() =>
					openMediaUploader(
						name as 'employee_avatar' | 'employee_documents'
					)
				}
				className='w-full bg-sky-500 text-white py-3 px-6 rounded-lg hover:bg-sky-600 transition duration-300 text-center font-bold'
			>
				{`Select ${label}`}
			</button>

			{watch(name) && (
				<div className='flex items-center justify-center h-full w-full'>
					{name === 'employee_avatar' ? (
						<div className='flex items-center justify-center w-full h-full'>
							<img
								src={watch(name)}
								alt='Preview'
								className='w-32 h-32 object-cover rounded-lg'
							/>
						</div>
					) : (
						<div className='flex flex-col items-center gap-x-2'>
							<p className='text-red-500 text-sm font-semibold mb-2'>
								{Array.isArray(watch(name)) ? watch(name).length : 0}{' '}
								Document(s) Selected
							</p>
							{Array.isArray(watch(name)) &&
								watch(name).map((doc: any, index: number) => {
									const fileName =
										doc.name ||
										doc.document_name ||
										`Document ${index + 1}`;
									const fileUrl = doc.url || doc.file_path || '#';

									return (
										<div
											key={index}
											className='flex items-center gap-x-2'
										>
											<a
												href={fileUrl}
												target='_blank'
												className='text-blue-600 underline'
											>
												{fileName}
											</a>
											<button
												type='button'
												onClick={() => handleRemoveFile(name, index)}
												className='bg-red-600 text-white rounded-full p-3 scale-[50%] hover:rotate-180'
											>
												<CloseIcon
													{...{
														dimension: '20',
														className: 'text-white'
													}}
												/>
											</button>
										</div>
									);
								})}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ButtonField;
