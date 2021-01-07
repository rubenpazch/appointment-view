import React, { useState } from 'react';

const ForgotPassword = () => {
  const [isRequested, setIsRequested] = useState(false);
  setIsRequested(true);
  return (
    <>
      <div>
        <h1>
          forgot your password
          {isRequested}
        </h1>
      </div>
    </>
  );
};

export default ForgotPassword;
