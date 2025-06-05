interface CurrentMonthsDays extends CalendarDaysProps {
	isToday: boolean;
}
const CurrentMonthsDays = ({
	isHoliday,
	isWeekend,
	handleMouseEnter,
	handleMouseLeave,
	day,
	dateStr,
	holidaysOnDate,
	isToday
}: CurrentMonthsDays) => {
	const cellBackground = () => {
		if (isToday) {
			return 'ring-2 ring-sky-500 bg-gradient-to-b from-gray-100 via-black-50 hover:from-sky-100 hover:to-gray-100 to-sky-100 hover:bg-sky-200 text-white font-semibold hover:text-sky-600 transition';
		}
		if (isHoliday && !isWeekend) {
			return `bg-sky-50 hover:bg-sky-100 transition`;
		}
		if (isWeekend) {
			return 'bg-red-50 hover:bg-red-100 transition'; // Adjust color for weekends
		}
		return 'bg-gray-100 hover:bg-gray-200 transition';
	};

	return (
		<div
			key={day}
			className={`relative h-12 sm:h-[7rem] border cursor-pointer transition-colors duration-200 rounded
				${cellBackground()}`}
			onMouseEnter={e => handleMouseEnter(e, dateStr)}
		>
			{isWeekend ? (
				<div className='p-2 flex flex-col items-center space-y-1'>
					<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-400 text-white'>
						{day}
					</span>
					{/* <div className='hidden sm:flex text-xs px-2 py-1 rounded bg-red-300 text-white'>
						Weekend
					</div> */}

					{/* 🔹 Show Holiday Names Below Weekend */}
					{isHoliday && (
						<div className='hidden sm:flex flex-col mt-2'>
							<HolidaysDay {...{ holidaysOnDate }} />
						</div>
					)}
				</div>
			) : (
				<div className='p-2 flex flex-col  space-y-1'>
					<span
						className={`inline-flex items-center justify-center w-6 h-6 rounded-full
						${isHoliday ? 'bg-sky-500 text-white' : 'text-sky-600'}`}
					>
						{day}
					</span>

					{/* 🔹 Show Holidays Below */}
					{isHoliday && (
						<div className='hidden sm:flex flex-col space-y-1 '>
							<HolidaysDay {...{ holidaysOnDate }} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CurrentMonthsDays;

interface HolidayProps {
	holidaysOnDate: HolidaysProps[];
}

const HolidaysDay = ({ holidaysOnDate }: HolidayProps) => {
	return (
		<>
			{holidaysOnDate.map((holiday: HolidaysProps) => (
				<div
					key={holiday.id}
					className={`text-xs px-2 py-1 rounded text-center w-fit ${
						holiday.holiday_type === 'Govt Holiday'
							? 'bg-sky-100 text-sky-800'
							: 'bg-blue-100 text-blue-800'
					}`}
				>
					{holiday.holiday_name}
				</div>
			))}
		</>
	);
};
