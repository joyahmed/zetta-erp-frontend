import { ChangeEvent } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Label from './Label';

interface SearchBoxProps {
	inputValue: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	text: string;
}

const SearchBox = ({
	inputValue,
	handleSearch,
	text
}: SearchBoxProps) => {
	return (
		<div className='relative w-full h-full'>
			<input
				type='text'
				value={inputValue}
				onChange={handleSearch}
				placeholder={text}
				className={`w-full px-2 peer text-sm focus:placeholder-transparent focus:outline-none focus:ring-0 shadow
				z-50 h-11 rounded-md text-sky-700/90 placeholder:text-sky-500
				`}
			/>
			<IoSearchSharp
				size={20}
				className={`absolute right-2 top-3 peer-focus:opacity-0 transition-all duration-300 ease-in-out text-sky-500/90
				}`}
			/>
			<Label
				{...{
					text: text,
					peerClassName: 'peer-focus:text-sky-500'
				}}
			/>
		</div>
	);
};

export default SearchBox;
