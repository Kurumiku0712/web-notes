import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleClick2 = () => {
    setCount2(count2 + 1);
  };

  const handleClick3 = () => {
    setCount3(count3 + 1);
    setCount3(count3 + 2);
    setCount3(count3 + 3);
  };

  const handleClick4 = () => {
    setCount4((prev) => prev + 1);
    setCount4((prev) => prev + 2);
    setCount4((prev) => prev + 3);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
      <h1>{count2}</h1>
      <button onClick={handleClick2}>Increment</button>
      <h1>{count3}</h1>
      <button onClick={handleClick3}>Increment</button>
      <h1>{count4}</h1>
      <button onClick={handleClick4}>Increment</button>
    </div>
  );
};

export default Counter;
