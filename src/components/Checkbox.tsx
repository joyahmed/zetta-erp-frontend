import { useState } from 'react';

interface Day {
	id: number;
	name: string;
	shortName: string;
}

const DAYS: Day[] = [
	{ id: 0, name: 'Sunday', shortName: 'Sun' },
	{ id: 1, name: 'Monday', shortName: 'Mon' },
	{ id: 2, name: 'Tuesday', shortName: 'Tue' },
	{ id: 3, name: 'Wednesday', shortName: 'Wed' },
	{ id: 4, name: 'Thursday', shortName: 'Thu' },
	{ id: 5, name: 'Friday', shortName: 'Fri' },
	{ id: 6, name: 'Saturday', shortName: 'Sat' }
];

interface CheckboxProps {
	toggleDay?: (dayId: number) => void;
	selectedDays?: number[];
}

const Checkbox = ({ toggleDay, selectedDays }: CheckboxProps) => {
	if (!toggleDay) return;

	return (
		<div className='flex items-center justify-center p-4 text-white'>
			<div className=' rounded-xl shadow-lg p-6 w-full max-w-md'>
				<div className='flex items-center gap-3 mb-6'>
					📅
					<h2 className='text-2xl font-semibold'>Select Days</h2>
				</div>

				<div className='space-y-4'>
					<div className='grid grid-cols-2 sm:grid-cols-7 gap-2'>
						{DAYS.map(day => (
							<label
								key={day.id}
								className={`
              relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer
              border-2 transition-all duration-200 text-sky-500
              ${
								selectedDays?.includes(day.id)
									? 'border-indigo-600 bg-sky-600 text-white'
									: 'border-gray-200 hover:border-indigo-200 '
							}
            `}
							>
								<input
									type='checkbox'
									className='absolute opacity-0'
									checked={selectedDays?.includes(day.id)}
									onChange={() => toggleDay(day.id)}
								/>
								<span className='text-sm font-medium'>
									{day.shortName}
								</span>
							</label>
						))}
					</div>

					<div className='mt-4 p-4 border rounded-lg'>
						<p className='text-sm'>
							Selected days:{' '}
							{selectedDays?.length === 0 ? (
								<span className='italic text-gray-400'>
									None selected
								</span>
							) : (
								<span className='font-medium text-sky-400'>
									{selectedDays &&
										selectedDays
											.sort((a, b) => a - b)
											.map(
												id => DAYS.find(day => day.id === id)?.name
											)
											.join(', ')}
								</span>
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkbox;
