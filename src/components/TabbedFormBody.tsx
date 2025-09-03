const CloseIcon = lazy(() => import('@/components/icons/CloseIcon'));
import { TabFieldItem } from '@/types/types';
import { lazy } from 'react';
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form';
const SelectList = lazy(() => import('@/components/SelectList'));

interface TabbedFormBodyProps<T extends FieldValues = FieldValues> {
	activeTab: number;
	fieldItems: TabFieldItem<T>[];
	uploadableFields?: (keyof T)[];
	setValue: UseFormSetValue<T>;
	register: UseFormRegister<T>;
	openMediaUploader?: (field: keyof T) => void;
	watch: UseFormWatch<T>;
	errors: FieldErrors<T>;
	cols: string;
	innerHeight?: string;
	textareaRows?: number;
}

const TabbedFormBody = <T extends FieldValues>({
	activeTab,
	fieldItems,
	uploadableFields = [],
	setValue,
	register,
	openMediaUploader,
	watch,
	errors,
	cols,
	innerHeight,
	textareaRows
}: TabbedFormBodyProps<T>) => {
	const handleRemoveFile = (field: Path<T>, index?: number) => {
		const fieldValue = watch(field);
		if (Array.isArray(fieldValue)) {
			const updatedFiles = [...fieldValue];
			updatedFiles.splice(index!, 1);
			setValue(field, updatedFiles as any, { shouldValidate: true });
		} else {
			setValue(field, null as any, { shouldValidate: true });
		}
	};

	return (
		<div
			className={`grid ${cols} gap-3 pt-5 w-full h-full ${
				innerHeight ? innerHeight : 'md:min-h-[20rem]'
			}`}
		>
			{fieldItems
				.filter(field => field.tab === activeTab)
				.map(({ label, type, name, options, required, colspan }) => {
					const fieldValue = watch(name as Path<T>);

					const handleSelectChange = (
						e: React.ChangeEvent<HTMLInputElement>
					) => {
						setValue(name, e.target.value as any, {
							shouldValidate: true
						});
					};

					return (
						<div key={String(name)} className={`mb-4 ${colspan}`}>
							{/* Hide Label for Specific Fields */}
							{type !== 'file' && (
								<label className='block font-medium'>{label}</label>
							)}

							{/* Select Input */}
							{type === 'select' ? (
								<SelectList
									{...{
										name: String(name),
										options,
										placeholder: `Select ${label}`,
										selectedValue: String(fieldValue),
										onChange: handleSelectChange
									}}
								/>
							) : type === 'textarea' ? (
								<textarea
									{...register(name, { required })}
									className='border p-2 w-full rounded-md'
									rows={textareaRows ?? 4}
								/>
							) : type === 'checkbox' ? (
								<input
									type='checkbox'
									{...register(name)}
									className='mr-2'
									checked={Boolean(fieldValue)}
								/>
							) : type === 'button' &&
							  uploadableFields.includes(name) ? (
								<div>
									<button
										type='button'
										onClick={() => openMediaUploader?.(name)}
										className='w-full bg-sky-500 text-white py-3 px-6 rounded-lg hover:bg-sky-600 transition duration-300 text-center font-bold'
									>
										{`Select ${label}`}
										{Array.isArray(watch(name)) && (
											<span className='ml-3 bg-white text-gray-700 px-2 py-1 rounded-lg text-sm'>
												{watch(name)?.length || 0} Selected
											</span>
										)}
									</button>

									{/* Media Preview */}
									{watch(name) && (
										<div className='mt-3 w-full'>
											{name.includes('avatar') ||
											name.includes('logo') ? (
												<div className='relative flex items-center justify-center w-full'>
													<img
														src={watch(name) as string}
														alt='Preview'
														className='w-32 h-32 object-cover rounded-lg border'
													/>
													{/* Remove Image Button */}
													<button
														type='button'
														onClick={() => handleRemoveFile(name)}
														className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 scale-[50%]'
													>
														<CloseIcon {...{ dimension: '20' }} />
													</button>
												</div>
											) : (
												<div>
													<p className='text-gray-700 text-sm mb-2'>
														{Array.isArray(watch(name))
															? watch(name).length
															: 0}{' '}
														Documents Selected
													</p>
													{Array.isArray(watch(name)) &&
														(watch(name) as string[]).map(
															(docUrl: string, index: number) => (
																<div
																	key={index}
																	className='flex items-center justify-between bg-gray-200 p-2 rounded-lg mb-2'
																>
																	<a
																		href={docUrl}
																		target='_blank'
																		rel='noopener noreferrer'
																		className='text-blue-600 underline truncate'
																	>
																		Document {index + 1}
																	</a>
																	{/* Remove Document Button */}
																	<button
																		type='button'
																		onClick={() =>
																			handleRemoveFile(name, index)
																		}
																		className='bg-red-600 text-white rounded-full p-2 scale-[50%]'
																	>
																		<CloseIcon
																			{...{ dimension: '20' }}
																		/>
																	</button>
																</div>
															)
														)}
												</div>
											)}
										</div>
									)}
								</div>
							) : (
								<input
									type={type}
									{...register(name, { required })}
									className='border p-2 w-full h-10 rounded-md'
								/>
							)}

							{errors[name] && (
								<p className='text-red-500 text-sm mt-1'>
									{label} is required
								</p>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default TabbedFormBody;
