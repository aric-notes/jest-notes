import { useState, useCallback } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((x) => x + 1), []);

  return { count, increment };
}


const DemoCounter = () => {
  const { count, increment } = useCounter();

  return (
    <div>
      <div className='eb-text-black eb-text-purple-500 eb-font-bold eb-mr-4'>{count}</div>
      <button
        className='eb-bg-purple-500 hover:eb-bg-purple-700 eb-text-white eb-font-bold eb-py-2 eb-px-2 eb-rounded'
        onClick={increment}
      >
        increment
      </button>
    </div>
  );
};
export default DemoCounter;