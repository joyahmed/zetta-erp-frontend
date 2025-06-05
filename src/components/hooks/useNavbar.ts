import { useCallback, useEffect, useRef, useState } from 'react';

interface MenuItem {
  text: string;
  link: string;
}

export const useNavbar = (menuItems: MenuItem[]) => {
  const [visibleItems, setVisibleItems] = useState<MenuItem[]>(menuItems);
  const [overflowItems, setOverflowItems] = useState<MenuItem[]>([]);
  const navRef = useRef<HTMLUListElement | null>(null);
  const moreButtonRef = useRef<HTMLLIElement | null>(null);

  const updateMenu = useCallback(() => {
    if (!navRef.current) return;

    const navWidth = navRef.current.offsetWidth;
    const moreButtonWidth = moreButtonRef.current?.offsetWidth || 0;
    let totalWidth = 115;
    const visible: MenuItem[] = [];
    const overflow: MenuItem[] = [];

    // Create temporary elements to measure actual widths
    const tempContainer = document.createElement('div');
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.position = 'absolute';
    tempContainer.style.display = 'flex';
    document.body.appendChild(tempContainer);

    for (let i = 0; i < menuItems.length; i++) {
      const tempItem = document.createElement('div');
      tempItem.className = navRef.current.children[0].className;
      tempItem.textContent = menuItems[i].text;
      tempContainer.appendChild(tempItem);

      const itemWidth = tempItem.offsetWidth + 16; // Add gap

      if (totalWidth + itemWidth <= navWidth - (overflow.length ? moreButtonWidth + 16 : 0)) {
        visible.push(menuItems[i]);
        totalWidth += itemWidth;
      } else {
        overflow.push(menuItems[i]);
      }
    }

    document.body.removeChild(tempContainer);

    setVisibleItems(visible);
    setOverflowItems(overflow);
  }, [menuItems]);

  useEffect(() => {
    // Initial update
    updateMenu();

    // Add event listener for window resize
    const handleResize = () => {
      updateMenu();
    };
    window.addEventListener('resize', handleResize);

    // Create ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateMenu();
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [updateMenu]);

  return { visibleItems, overflowItems, navRef, moreButtonRef };
};