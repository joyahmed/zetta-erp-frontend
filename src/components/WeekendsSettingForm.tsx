import { lazy } from 'react';
const SubmitButton = lazy(() => import('@/components/SubmitButton'));
import { useWeekendsForm } from './hooks/useWeekendsForm';

const WeekendsSettingForm = () => {
	const {
		handleSubmit,
		daysOfWeek,
		selectedWeekends,
		handleCheckboxChange
	} = useWeekendsForm();

	return (
		<form
			onSubmit={handleSubmit}
			className='p-5 rounded-lg shadow-md max-w-lg mx-auto space-y-10 bg-white'
		>
			<h2 className='font-bold text-2xl text-sky-600 uppercase text-center'>
				Select Your Weekends
			</h2>

			<div className='grid grid-cols-2 gap-5'>
				{daysOfWeek.map(day => (
					<label
						key={day}
						className={`flex items-center space-x-3 p-3 rounded-md border-2 cursor-pointer font-semibold text-lg w-[12rem]
						transition-all shadow ${
							selectedWeekends.includes(day)
								? 'bg-sky-500 border-sky-400 text-white'
								: 'bg-gray-100 border-sky-100 text-sky-700'
						}`}
						onClick={() => handleCheckboxChange(day)}
					>
						{/* Hidden Checkbox Input */}
						<input
							type='checkbox'
							value={day}
							checked={selectedWeekends.includes(day)}
							onChange={() => handleCheckboxChange(day)}
							hidden
							className='scale-0 opacity-0'
						/>

						{/* Custom Checkbox Indicator */}
						<div
							className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all ${
								selectedWeekends.includes(day)
									? 'bg-white border-white'
									: 'bg-gray-200 border-sky-500'
							}`}
						>
							{selectedWeekends.includes(day) && (
								<span className='w-3 h-3 bg-sky-600 rounded-full'></span>
							)}
						</div>

						<span>{day}</span>
					</label>
				))}
			</div>

			<SubmitButton {...{ text: 'Save Weekends' }} />
		</form>
	);
};

export default WeekendsSettingForm;
