import React, { useState } from 'react';

const Registration = () => {
  const [loading, setLoading] = useState(false);
  setLoading(false);
  return (
    <div>
      <div>
        <h3 className="font-size-h1">
          new text in registration
          {loading}
        </h3>
        <p>
          Enter your details to create your account
        </p>
      </div>
    </div>
  );
};

export default Registration;
