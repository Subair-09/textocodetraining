import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string; // ISO date string or default to Oct 14, 2026 18:00:00 GMT+1
  label?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-10-14T18:00:00+01:00',
  label = 'Live Training Starts In:',
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>The Live Masterclass is Happening Today!</span>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex flex-col items-center">
      {label && (
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-widest mb-3 bg-blue-100/70 px-3.5 py-1 rounded-full border border-blue-200/60">
          <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>{label}</span>
        </div>
      )}

      {/* Timer Cards */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md w-full">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-white border border-blue-200/90 shadow-md shadow-blue-500/5 transition-all hover:scale-105"
          >
            <span className="text-2xl sm:text-4xl font-black text-blue-600 font-mono tracking-tight leading-none">
              {block.value}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
