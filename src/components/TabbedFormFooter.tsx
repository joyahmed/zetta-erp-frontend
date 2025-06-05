import SubmitButton from '@/components/SubmitButton';
import { FormEvent } from 'react';

interface TabbedFormFooterProps {
	handlePrevTab: (e: FormEvent) => void;
	handleNextTab: (e: FormEvent) => void;
	activeTabIndex: number;
	tabsLength: number;
	showSubmitCondition: boolean;
}

const TabbedFormFooter = ({
	handlePrevTab,
	handleNextTab,
	activeTabIndex,
	tabsLength,
	showSubmitCondition
}: TabbedFormFooterProps) => {
	return (
		<>
			<div className='flex justify-between items-center w-full md:w-1/3 my-5 gap-5'>
				<TabFormFooterButton
					{...{
						onClick: handlePrevTab,
						disabled: activeTabIndex === 0,
						text: 'Previous'
					}}
				/>

				<TabFormFooterButton
					{...{
						onClick: handleNextTab,
						disabled: activeTabIndex === tabsLength - 1,
						text: 'Next'
					}}
				/>
			</div>

			{showSubmitCondition ? (
				<div className='w-full'>
					<SubmitButton />
				</div>
			) : null}
		</>
	);
};

export default TabbedFormFooter;

interface TabFormFooterButtonProps {
	onClick: (e: FormEvent) => void;
	disabled: boolean;
	text: string;
}

const TabFormFooterButton = ({
	onClick,
	disabled,
	text
}: TabFormFooterButtonProps) => {
	return (
		<button
			type='button'
			{...{ onClick, disabled }}
			className={`py-2 rounded-md w-1/2 font-semibold ${
				disabled
					? 'bg-gray-300 text-gray-500 cursor-not-allowed'
					: 'bg-sky-500 text-white hover:bg-sky-400'
			}`}
		>
			{text}
		</button>
	);
};
