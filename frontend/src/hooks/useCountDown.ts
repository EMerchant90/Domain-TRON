import { useEffect, useState } from 'react';
import {
  formatDaysHoursMinutesSeconds,
  formatHours,
  formatMinutes,
  formatSeconds,
} from '../utils/format';

type IProps = {
  targetTimestamp: any;
};

export const useCountDown = ({targetTimestamp}: IProps) => {

  const [counter, setCounter] = useState("Calculating...");
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = targetTimestamp - currentTime;
  
      if (timeDifference > 0 ) {
        if (timeDifference >= 86400) {
          setCounter(formatDaysHoursMinutesSeconds(timeDifference));
        } else if (timeDifference >= 3600) {
          setCounter(formatHours(timeDifference));
        } else if (timeDifference >= 60) {
          setCounter(formatMinutes(timeDifference));
        } else {
          setCounter(formatSeconds(timeDifference));
        }
      } else {
        clearInterval(interval);
        setCounter('Claim Available');
        setIsEnded(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return {
    counter,
    isEnded,
  };
};
