import axios from 'axios';
import React, { useState, useEffect } from 'react';

export function getData() {
  return axios.get('http://my-backend/fake-data');
}

// onclick call back
export const Button = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  return (
    <div>
      <button
        className='eb-bg-teal-500 hover:eb-bg-teal-700 eb-text-white eb-font-bold eb-py-2 eb-px-4 eb-rounded'
        onClick={() => {
          setIsLoading(true);
          getData()
            .then((response) => {
              setData(response.data);
            })
            .catch((e) => {
              setError(e.response.data);
            }).finally(() => {
            setIsLoading(false);
          });
        }}
      >
        請按
      </button>
      {isLoading ? (
        <div>Loading........</div>
      ) : (
        <ul>
          {data.map((i) => (
            <li className="item" key={i}>{i}</li>
          ))}
        </ul>
      )}
      {error && error}
    </div>
  );
};