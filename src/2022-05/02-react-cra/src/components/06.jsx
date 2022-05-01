import React from 'react';

// subtest: table
export const Button = ({ type }) => {
  const getCls = (type) => {
    const typeACls = 'eb-bg-green-500';
    switch (type) {
      case 'A':
        return typeACls;
      case 'B':
        return 'eb-bg-blue-500';
      case 'C':
        return 'eb-bg-red-500';
      default:
        return 'other';
    }
  };

  return (<button
    className={`${getCls(type)} eb-text-white eb-font-bold eb-py-2 eb-px-4 eb-rounded`}
  >
    Hi
  </button>);
};
