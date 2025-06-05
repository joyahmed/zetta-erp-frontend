const OtherMonthDays = ({
	isHoliday,
	isWeekend,
	handleMouseEnter,
	handleMouseLeave,
	day,
	dateStr,
	holidaysOnDate
}: CalendarDaysProps) => {
	return (
		<div
			className={`relative h-12 sm:h-[7rem] border border-gray-200 ${
				isWeekend ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-50 hover:bg-gray-100'
			} opacity-50 rounded`}
			onMouseEnter={e => isHoliday && handleMouseEnter(e, dateStr)}
			//onMouseLeave={handleMouseLeave}
		>
			<div className='flex flex-col items-center justify-center p-2'>
				<span className='text-gray-400'>{day}</span>
				{isWeekend ? (
					<div className='p-2 hidden sm:flex flex-col items-center'>
						{/* <div className='text-xs px-2 py-1 rounded bg-red-300 text-white'>
							Weekend
						</div> */}
					</div>
				) : null}
				{isHoliday && (
					<div className='hidden sm:flex flex-col opacity-50'>
						{holidaysOnDate.map(holiday => (
							<div
								key={holiday.id}
								className={`text-xs px-2 py-1 rounded ${
									holiday.holiday_type === 'Govt Holiday'
										? 'bg-sky-300 text-sky-800'
										: 'bg-blue-300 text-blue-800'
								}`}
							>
								{holiday.holiday_name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OtherMonthDays;
