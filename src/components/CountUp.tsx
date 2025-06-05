import React, { useEffect, useState } from 'react';

const CountUp = ({ targetNumber, duration, prefix='' }: CountUpProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const increment = targetNumber / duration;
    let animationFrameId: number; // Store the requestAnimationFrame ID

    const updateCount = () => {
      const now = Date.now();
      if (startTimestamp === null) startTimestamp = now;
      const elapsedTime = now - startTimestamp;
      const newCount = Math.min(Math.floor(increment * elapsedTime), targetNumber);
      setCount(newCount);

      if (newCount < targetNumber) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      startTimestamp = null;
    };
  }, [targetNumber, duration]);

  const formattedNumber =  `${prefix}${count < 10 ? `0${count}` : count.toString()}`;

  return <> {formattedNumber}</>;
};

export default CountUp;