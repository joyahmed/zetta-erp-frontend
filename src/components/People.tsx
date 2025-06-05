const PageWrapper = lazy(() => import('@/components/PageWrapper'));
const LoadMore = lazy(() => import('@/components/LoadMore'));
const SearchBox = lazy(() => import('@/components/SearchBox'));
import { useFetchData } from '@/components/hooks/useFetchData';
import { useInitialData } from '@/components/hooks/useInitialData';
import { Suspense, lazy, useState } from 'react';
import { useTableData } from './hooks/useTableData';
import { menuItems } from './menu/hrm-menu-items';
import { peopleColumns } from './table/table-columns/people-columns';
const PeopleCard = lazy(() => import('./PeopleCard'));

const PeopleDashboard = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);

	const { fetchData } = useInitialData({
		query,
		page,
		url: 'people/people'
	});

	const { data, totalItems } = useFetchData<EmployeeProps>({
		query,
		page,
		fetchData
	});

	const {
		itemState: { searchText },
		setItemState,
		handleSearch,
		inputValue,
		dataArray,
		handleLoadMore,
		handleSort,
		sortKey,
		sortOrder
	} = useTableData({
		query,
		setQuery,
		setPage,
		initialData: data,
		totalItems,
		columns: peopleColumns,
		fetchData
	});

	const current = Number(dataArray?.length) || 0;
	const total = Number(totalItems);
	const showLoadMore = current !== total && current >= 10;

	// if (current > 0 && total > 0) {
	// 	console.log(`debug: currentItems =>`, current);
	// 	console.log(`debug: totalItems =>`, totalItems);
	// 	console.log(`debug: showLoadMore =>`, showLoadMore);
	// }

	return (
		<Suspense>
			<PageWrapper {...{ menuItems }}>
				<div className='flex flex-col items-center justify-center  w-full space-y-7'>
					<h1 className='text-3xl text-sky-600 font-bold'>
						My Colleagues
					</h1>

					<div className='w-full max-w-screen-sm'>
						<SearchBox
							{...{
								inputValue,
								searchText,
								handleSearch,
								text: 'Search'
							}}
						/>
					</div>
					<PeopleCard {...{ people: dataArray }} />
					<LoadMore {...{ showLoadMore, handleLoadMore }} />
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default PeopleDashboard;
