import { ChangeEvent, useState, useTransition } from 'react';

interface HandleSearchProps<T> {
	setItemState: SetItemStateFunctionSearch<T>;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const useHandleSearch = <T extends object>({
	setItemState,
	setQuery
}: HandleSearchProps<T>) => {
	const [isPending, startTransition] = useTransition();
	const [inputValue, setInputValue] = useState('');
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		startTransition(() => {
			setItemState(prev => ({
				...prev,
				searchText: value
			}));
		});
		setQuery(value);
	};

	return { handleSearch, inputValue, isPending, setInputValue };
};

export default useHandleSearch;
