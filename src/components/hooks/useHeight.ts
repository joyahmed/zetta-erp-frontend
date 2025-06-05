import { useEffect, useState } from 'react';

const useHeight = () => {
	const [goUp, setGoUp] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setGoUp(scrollPosition > 100);
		};

		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return { goUp };
};

export default useHeight;
