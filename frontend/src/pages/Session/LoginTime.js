import React, { useState, useEffect } from 'react';

const LoginTime = () => {
  const [loginTime, setLoginTime] = useState(() => {
    // Retrieve login time from local storage on component mount
    const storedLoginTime = localStorage.getItem('loginTime');
    return storedLoginTime ? new Date(storedLoginTime) : new Date();
  });

  useEffect(() => {
    // Save login time to local storage whenever it changes
    localStorage.setItem('loginTime', loginTime.toISOString());

    const interval = setInterval(() => {
      // Update the counter every second
      setLoginTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [loginTime]);

  // Function to calculate the time difference
  const calculateTimeDifference = () => {
    const currentTime = new Date();
    const difference = currentTime - loginTime;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div className="">
      <p>{`login time: ${calculateTimeDifference()}`}</p>
    </div>
  );
};

export default LoginTime;
