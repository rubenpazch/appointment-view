import React, { useState } from 'react';

const Logout = () => {
  const [test, setTest] = useState(false);
  setTest(true);
  return (
    <div>
      <h1>
        this is logut
        {test}
      </h1>
    </div>
  );
};

export default Logout;
