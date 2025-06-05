import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState
} from 'react';

export interface GlobalStateType {
	isOpen: boolean;
	action: string;
	id: number;
	fetchInitialData: boolean;
}

interface GlobalContextType {
	globalState: GlobalStateType;
	setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
	toggleModal: () => void;
	handleAction: (type: string, id: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(
	undefined
);

const initialState = {
	id: 0,
	isOpen: false,
	action: '',
	fetchInitialData: false
};

export const GlobalProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const [globalState, setGlobalState] = useState(initialState);
	const toggleModal = () =>
		setGlobalState(prev => ({
			...prev,
			isOpen: !prev.isOpen,
			id: 0
		}));

	const handleAction = (type: string, id: number) => {
		setGlobalState(prev => ({
			...prev,
			id: id,
			isOpen: true,
			action: type
		}));
	};

	return (
		<GlobalContext.Provider
			value={{
				globalState,
				setGlobalState,
				toggleModal,
				handleAction
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobal = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobal must be used within a GlobalProvider');
	}
	return context;
};
