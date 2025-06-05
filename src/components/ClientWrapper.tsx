import { useQuery } from '@/components/hooks/useQuery';
import { useGlobal } from '@/context/GlobalContext';
import { Suspense, lazy } from 'react';
import { useTableData } from './hooks/useTableData';
const BulkDeleteButton = lazy(() => import('./BulkDeleteButton'));
const Modal = lazy(() => import('./Modal'));
const Navbar = lazy(() => import('./Navbar'));
const CreateButton = lazy(() => import('./CreateButton'));

const SearchBox = lazy(() => import('./SearchBox'));
const Loader = lazy(() => import('./Loader'));
const SortableTable = lazy(() => import('./table/SortableTable'));
const LoadMore = lazy(() => import('./LoadMore'));

interface ClientWrapperProps<T extends object> {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	initialData: T[] | undefined;
	totalItems: number;
	mainRoute: string;
	createRoute?: string;
	columns: { key: keyof T; text: string }[];
	fetchData: (args: {
		query: string;
		page: number;
	}) => Promise<{ data: T[]; totalItems: number } | undefined>;
	headingText: string;
	buttonText: string;
	searchBoxText: string;
	showCreate: boolean;
	showSearch: boolean;
	TableBody: React.ComponentType<{
		tableData: T[];
		totalItems: number;
	}>;
	modalContent: React.ReactNode;
	dynamicClass?: string;
	dynamicClassTwo?: string;
	menuItems: MenuItem[];
	showActions?: boolean;
	bulkDelete?: boolean;
	removeMarginTop?: boolean;
	loading?: boolean;
}

const ClientWrapper = <T extends object>({
	query,
	setQuery,
	page,
	setPage,
	initialData,
	totalItems,
	mainRoute,
	createRoute,
	columns,
	fetchData,
	headingText,
	buttonText,
	searchBoxText,
	showCreate,
	showSearch,
	TableBody,
	modalContent,
	dynamicClass,
	dynamicClassTwo,
	menuItems,
	showActions,
	bulkDelete,
	removeMarginTop = true,
	loading
}: ClientWrapperProps<T>) => {
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
		initialData,
		totalItems,
		columns,
		fetchData
	});

	useQuery<T>({
		route: mainRoute,
		searchText,
		page,
		initialData: initialData || [],
		setItemState
	});

	const { toggleModal, globalState, setGlobalState } = useGlobal();
	const { isOpen } = globalState;

	const handleCreate = () => {
		setGlobalState(prev => ({
			...prev,
			action: 'create',
			isOpen: true
		}));
	};

	const handleBulkDelete = () => {
		setGlobalState(prev => ({
			...prev,
			action: 'bulk-delete',
			isOpen: true
		}));
	};

	const current = Number(dataArray?.length || 0);
	const total = Number(totalItems);

	const showLoadMore = current !== total && current >= 10;

	return (
		<div className='flex flex-col items-center w-full min-h-fit pr-3 lg:pr-5 z-50'>
			<Navbar {...{ menuItems }} />
			<div
				className={`flex flex-col items-center h-auto w-full z-40 ${
					removeMarginTop ? 'mt-[2rem]' : ''
				}`}
			>
				{/* Top Controls */}
				<div className='flex flex-col lg:flex-row gap-y-6 lg:gap-y-0 items-center justify-between w-full my-7'>
					{showCreate ? (
						<CreateButton
							{...{
								text: buttonText,
								onClick: handleCreate,
								createRoute,
								bulkDelete
							}}
						/>
					) : (
						<div
							className={`w-full ${
								bulkDelete ? 'sm:w-[30%]' : 'sm:w-[33%]'
							} max-w-[400px]`}
						/>
					)}

					{bulkDelete ? (
						<BulkDeleteButton {...{ onClick: handleBulkDelete }} />
					) : null}

					<h1 className='font-bold text-2xl text-sky-600 uppercase w-full order-1 lg:order-2 text-center'>
						{headingText}
					</h1>

					{showSearch ? (
						<div
							className={`w-full sm:w-[33%] mx-auto ${
								bulkDelete
									? 'order-3 sm:order-4'
									: 'order-3 sm:order-3'
							} max-w-[400px]`}
						>
							<SearchBox
								{...{
									inputValue,
									searchText,
									handleSearch,
									text: searchBoxText
								}}
							/>
						</div>
					) : null}
				</div>

				{/* Main Table + LoadMore */}
				<Suspense>
					{loading ? (
						<div
							className='flex items-center justify-center'
							style={{ height: '70dvh' }}
						>
							<Loader />
						</div>
					) : (
						<div className='flex flex-col items-center justify-center w-full my-5 gap-y-5 overflow-y-auto min-h-[33rem] sm:min-h-[30rem]'>
							{dataArray && totalItems > 0 ? (
								<SortableTable<T>
									{...{
										data: dataArray || [],
										columns,
										handleSort,
										sortKey,
										sortOrder,
										currentItems: dataArray?.length || 0,
										showActions
									}}
								>
									<TableBody
										{...{ tableData: dataArray, totalItems }}
									/>
								</SortableTable>
							) : (
								<p className='font-bold text-5xl text-red-600'>{`No ${buttonText} in Database`}</p>
							)}
							<LoadMore {...{ showLoadMore, handleLoadMore }} />
						</div>
					)}
				</Suspense>

				{/* Modal */}
				<Modal
					{...{
						isOpen,
						onClose: toggleModal,
						dynamicClass,
						dynamicClassTwo
					}}
				>
					{modalContent}
				</Modal>
			</div>
		</div>
	);
};

export default ClientWrapper;
