import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000); 
    const timeDifference = targetTimestamp - currentTime;

    if (timeDifference > 0) {
      const daysRemaining = Math.floor(timeDifference / (60 * 60 * 24)); 
      const hoursRemaining = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60)); 
      const minutesRemaining = Math.floor((timeDifference % (60 * 60)) / 60); 
      setRemainingTime({ days: daysRemaining, hours: hoursRemaining, minutes: minutesRemaining });
    }
  }, [targetTimestamp]);

  return (
    <div className='countdown-date'>
      {remainingTime.days > 0 ? (
        <p>{`${remainingTime.days} days left`}</p>
      ) : remainingTime.hours > 0 ? (
        <p>{`${remainingTime.hours} hours left`}</p>
      ) : remainingTime.minutes > 0 ? (
        <p>{`${remainingTime.minutes} minutes left`}</p>
      ) : ("Claim now")}
    </div>
  );
};

export default CountdownTimer;
