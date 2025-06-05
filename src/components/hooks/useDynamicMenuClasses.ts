import { useState, useEffect } from 'react';

export default function useDynamicMenuClasses() {
  const [dynamicClass, setDynamicClass] = useState('');

  useEffect(() => {
    function updateMenuStyles() {
      const collapsed = document.body.classList.contains('folded');
      const screenWidth = window.innerWidth;

      // EXAMPLE logic – customize as you wish
      let marginValue: number;
      let paddingValue: number;

      if (collapsed) {
        // Collapsed: margin is 5% of screen (capped at 50px), padding is half
        marginValue = Math.min(screenWidth * 0.05, 150);
        paddingValue = Math.round(marginValue / 2);
      } else {
        // Expanded: margin is 15% of screen (capped at 200px), padding is half
        marginValue = Math.min(screenWidth * 0.15, 200);
        paddingValue = Math.round(marginValue / 2);
      }

      console.log(`debug: marginValue =>`, marginValue);
      console.log(`debug: paddingValue =>`, paddingValue);

      // Build valid Tailwind classes
      setDynamicClass(`ml-[${marginValue}px] px-[${paddingValue}px]`);
    }

    // Run once on mount
    updateMenuStyles();

    // (Optional) watch for WP menu toggling
    const observer = new MutationObserver(updateMenuStyles);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // (Optional) also re-check on window resize
    window.addEventListener('resize', updateMenuStyles);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateMenuStyles);
    };
  }, []);

  return {dynamicClass};
}
