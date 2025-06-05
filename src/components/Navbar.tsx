import useHeight from '@/components/hooks/useHeight';
import { useNavbar } from '@/components/hooks/useNavbar';
import { useGlobal } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

interface MenuItem {
	text: string;
	link: string;
}

interface NavbarProps {
	menuItems: MenuItem[];
}

const Navbar = ({ menuItems }: NavbarProps) => {
	const { visibleItems, overflowItems, navRef, moreButtonRef } =
		useNavbar(menuItems);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [active, setActive] = useState<string | undefined>('');
	const { globalState } = useGlobal();

	useEffect(() => {
		const url = new URL(window.location.href);
		const pageValue = url.searchParams.get('page');
		const extracted = pageValue
			?.replace('zetta_erp_', '')
			.replace('_', ' ');
		setActive(extracted);
	}, []);

	const { goUp } = useHeight();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				navRef.current &&
				!navRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	return (
		<nav
			className={`w-full rounded-xl p-4 m-4 uppercase text-sm md:text-[16px] transition ${
				menuItems.length ? 'sticky shadow' : 'hidden'
			} ${globalState.isOpen ? '-z-[9999]' : 'z-50'} ${
				goUp ? 'top-2 bg-white/60' : 'top-8 bg-white/50'
			} md:top-8 backdrop-blur-xl`}
		>
			<ul
				ref={navRef}
				className='flex flex-wrap items-center justify-center gap-x-4 font-semibold'
			>
				{visibleItems.map(item => (
					<li
						key={item.text}
						className='relative max-w-[125px] md:max-w-[150px] lg:max-w-[200px] group'
					>
						<a
							href={item.link}
							className='text-sky-600 hover:text-sky-700 transition whitespace-nowrap'
						>
							{item.text}
						</a>
						<UnderLine {...{ active, item }} />
					</li>
				))}
				{overflowItems.length > 0 && (
					<li ref={moreButtonRef} className='relative w-fit'>
						<button
							className='text-sky-600 hover:text-sky-800 uppercase text-sm md:text-[16px] group whitespace-nowrap'
							onClick={() => setDropdownOpen(!isDropdownOpen)}
						>
							More
							<div className='hidden group-hover:flex'>
								<UnderLine />
							</div>
						</button>

						<ul
							className={`absolute top-6 right-0 bg-gray-100 shadow-md rounded-lg p-2 min-w-40 transition-all origin-top-right ${
								isDropdownOpen
									? 'translate-y-0 z-10 opacity-100 scale-100'
									: '-translate-y-2 -z-50 opacity-0 scale-0'
							}`}
						>
							{overflowItems.map(item => (
								<li key={item.text} className='mb-2 last:mb-0'>
									<a
										href={item.link}
										className='block text-sky-600 hover:text-sky-800 hover:underline underline-offset-4 transition whitespace-nowrap'
									>
										{item.text}
									</a>
								</li>
							))}
						</ul>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;

interface UnderLineProps {
	item?: MenuItem;
	active?: string | undefined;
}

const UnderLine = ({ active, item }: UnderLineProps) => {
	return (
		<span
			className={`absolute -bottom-1 md:-bottom-2 mx-auto inset-x-0 h-[2.5px] max-w-[120px] md:max-w-[150px] lg:max-w-[200px] ${
				active === item?.text?.toLowerCase()
					? 'w-full'
					: 'w-0 group-hover:w-full'
			} bg-sky-500 transition-all ease-in-out`}
		></span>
	);
};
