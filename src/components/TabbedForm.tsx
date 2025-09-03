import { TabFieldItem } from '@/types/types';
import { FormEvent, lazy } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form';
const TabbedFormBody = lazy(() => import('./TabbedFormBody'));
const TabbedFormTabs = lazy(() => import('./TabbedFormTabs'));
const TabbedFormFooter = lazy(() => import('./TabbedFormFooter'));

interface TabbedFormProps<T extends FieldValues = FieldValues> {
	heading: string;
	action: string;
	tabItems: {
		id: number;
		title: string;
	}[];
	activeTab: number;
	handleTabChange: (newTab: number) => Promise<void>;
	handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
	onSubmit: () => Promise<void>;
	fieldItems: TabFieldItem<T>[];
	uploadableFields?: (keyof T)[];
	setValue: UseFormSetValue<T>;
	register: UseFormRegister<T>;
	openMediaUploader?: (field: keyof T) => void;
	watch: UseFormWatch<T>;
	errors: FieldErrors<T>;
	handlePrevTab: (e: FormEvent) => void;
	handleNextTab: (e: FormEvent) => void;
	activeTabIndex: number;
	tabsLength: number;
	showSubmitCondition: boolean;
	cols: string;
	outerHeight?: string;
	innerHeight?: string;
	textareaRows?: number;
}

const TabbedForm = <T extends FieldValues>({
	heading,
	action,
	tabItems,
	activeTab,
	handleTabChange,
	handleSubmit,
	onSubmit,
	fieldItems,
	uploadableFields,
	setValue,
	register,
	openMediaUploader,
	watch,
	errors,
	handlePrevTab,
	handleNextTab,
	activeTabIndex,
	tabsLength,
	showSubmitCondition,
	cols,
	textareaRows,
	outerHeight,
	innerHeight
}: TabbedFormProps) => {
	return (
		<div
			className={`mx-auto p-6 border rounded-lg shadow-md w-full h-full md:w-auto my-auto ${
				outerHeight ? outerHeight : 'min-h-[27rem]'
			}`}
		>
			<h2 className='font-bold text-2xl text-sky-600 uppercase mb-10 text-center'>
				{heading}
			</h2>

			<TabbedFormTabs {...{ tabItems, activeTab, handleTabChange }} />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center justify-between'
			>
				<TabbedFormBody
					{...{
						activeTab,
						fieldItems,
						uploadableFields,
						setValue,
						register,
						openMediaUploader,
						watch,
						errors,
						cols,
						textareaRows,
						innerHeight
					}}
				/>
				<TabbedFormFooter
					{...{
						handlePrevTab,
						handleNextTab,
						activeTabIndex,
						tabsLength,
						showSubmitCondition
					}}
				/>
			</form>
		</div>
	);
};

export default TabbedForm;
