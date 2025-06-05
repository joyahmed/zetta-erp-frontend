interface LoadMoreProps {
	showLoadMore: boolean;
	handleLoadMore: () => void;
}

const LoadMore = ({
	showLoadMore,
	handleLoadMore
}: LoadMoreProps) => {
	return (
		<>
			{showLoadMore ? (
				<div
					className='bg-sky-600 hover:bg-sky-700 text-white hover:scale-[102%] transition text-[12px] font-bold px-3 py-2 rounded-lg cursor-pointer'
					onClick={handleLoadMore}
				>
					Load More
				</div>
			) : null}
		</>
	);
};

export default LoadMore;
