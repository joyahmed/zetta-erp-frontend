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
			<div className='flex items-center justify-center space-x-5 lg:space-x-8  my-5 gap-5'>
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
			className={` rounded-md h-10 w-24 font-semibold ${
				disabled
					? 'bg-gray-300 text-gray-500 cursor-not-allowed'
					: 'bg-sky-500 text-white hover:bg-sky-400'
			}`}
		>
			{text}
		</button>
	);
};
