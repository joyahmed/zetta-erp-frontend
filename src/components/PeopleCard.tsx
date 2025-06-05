import { formatDate } from '@/utils/format-date';

interface PeopleCardProps {
	people: EmployeeProps[] | undefined;
}

const PeopleCard = ({ people }: PeopleCardProps) => {
	return (
		<div className='flex flex-wrap items-start justify-center w-full py-5 gap-5 overflow-y-auto'>
			{people ? (
				people.map(item => (
					<div
						key={item?.id}
						className='relative flex flex-col items-center justify-between w-full h-[40rem] lg:h-[41rem] md:w-[30%] 2xl:w-[22%] gap-x-3 shadow rounded-xl text-lg p-5'
					>
						<div className='relative flex items-center justify-center h-[25rem] w-full'>
							<img
								src={item.employee_avatar}
								className='fill object-cover object-top rounded-md w-full h-full'
							/>
						</div>

						<div className='flex flex-col z-50 w-full py-2 space-y-2'>
							<div className='text-sky-600 font-bold'>
								Name: {`${item?.first_name}  ${item?.last_name}`}
							</div>
							<div>
								<strong>Department: </strong>
								{item.department_name}
							</div>
							<div>
								<strong>Designation:</strong> {item.designation_name}
							</div>
							<div>
								<strong>Gender:</strong> {item?.gender}
							</div>
							<div>
								<strong> Email: </strong>
								<a
									href={`mailto: ${item.email}`}
									className='italic text-sky-600'
								>
									{item?.email}
								</a>
							</div>
							<div>
								<strong>Joining Date:</strong>{' '}
								{formatDate(item?.date_of_joining)}
							</div>
						</div>
					</div>
				))
			) : (
				<div>No colleague found!</div>
			)}
		</div>
	);
};

export default PeopleCard;
