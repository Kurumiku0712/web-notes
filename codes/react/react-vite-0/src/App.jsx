import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleClick2 = () => {};

  const a = 1
  const b = 2
  const add = (a, b) => {
    a + b;
  };

  return (
    <div>
      <h1>{add(a, b)}</h1>
      <button>Increment</button>
    </div>
  );
};

export default Counter;
