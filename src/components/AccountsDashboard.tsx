const DashboardDataComponent = lazy(
	() => import('@/components/DashboardDataComponent')
);
import { lazy, Suspense } from 'react';
import { menuItems } from './menu/accounts-menu-items';
const CashFlowChart = lazy(() => import('./CashFlowChart'));
const InvoicesChart = lazy(() => import('./InvoicesChart'));
const PageWrapper = lazy(() => import('./PageWrapper'));
const ProfitLossChart = lazy(() => import('./ProfitLossChart'));

const AccountsDashboard = () => {
	const itemsArray = [
		// {
		// 	text: 'Income vs Expense',
		// 	children: <IncomeExpenseChart />,
		// 	colspan: 'col-span-2 xl:col-span-3'
		// },
		{
			text: 'Cash Flow',
			children: <CashFlowChart />,
			colspan: 'col-span-2 '
		},
		// {
		// 	text: 'Top Expenses',
		// 	children: <TopExpensesChart />,
		// 	colspan: 'col-span-2'
		// },
		{
			text: 'Invoices',
			children: <InvoicesChart />,
			colspan: 'col-span-2'
		},
		{
			text: 'Profit & Loss',
			children: <ProfitLossChart />,
			colspan: 'col-span-2'
		}
	];
	return (
		<Suspense>
			<PageWrapper {...{ menuItems }}>
				<div className='flex flex-col items-center justify-center h-full w-full'>
					<h1 className='text-2xl md:text-4xl font-bold mb-6 text-sky-600'>
						Accounts Dashboard
					</h1>

					<div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-5 h-full w-full'>
						{itemsArray.map(item => (
							<DashboardDataComponent
								key={item.text}
								{...{
									text: item.text,
									children: item.children,
									colspan: item.colspan
								}}
							/>
						))}
					</div>
				</div>
			</PageWrapper>
		</Suspense>
	);
};

export default AccountsDashboard;
