interface TabbedFormTabsProps {
	tabItems: {
		id: number;
		title: string;
	}[];
	activeTab: number;
	handleTabChange: (newTab: number) => Promise<void>;
}

const TabbedFormTabs = ({
	tabItems,
	activeTab,
	handleTabChange
}: TabbedFormTabsProps) => {
	return (
		<div className='flex flex-col items-center justify-center lg:flex-row border-b mb-4 w-full space-y-2 md:space-y-0'>
			{tabItems.map(tab => (
				<button
					key={tab.id}
					className={`flex-1 text-center py-2 px-2 w-full md:min-w-fit mx-3 font-bold text-sm transition rounded-md ${
						activeTab === tab.id
							? 'bg-sky-500  text-white'
							: 'text-sky-500 bg-gray-300'
					}`}
					onClick={() => handleTabChange(tab.id)}
				>
					{tab.title}
				</button>
			))}
		</div>
	);
};

export default TabbedFormTabs;
