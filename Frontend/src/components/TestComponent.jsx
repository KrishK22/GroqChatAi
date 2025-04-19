import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Tailwind Test</h1>
      <p className="mt-2">If you can see this with blue background and white text, Tailwind is working!</p>
      <div className="mt-4 p-3 bg-white text-blue-500 rounded">
        This div has p-3 padding
      </div>
    </div>
  );
};

export default TestComponent; 