import { useGlobal } from '@/context/GlobalContext';

export const useResetTableData = () => {
	const { setGlobalState } = useGlobal();
	const handleResetTableData = () => {
		setGlobalState(prev => ({
			...prev,
			id: 0,
			action: '',
			isOpen: false,
			fetchInitialData: true
		}));
		setTimeout(
			() =>
				setGlobalState(prev => ({
					...prev,
					fetchInitialData: false
				})),
			1000
		);
	};
	return {
		handleResetTableData
	};
};
