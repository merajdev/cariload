// components/Spinner.tsx

'use client';

import { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface SpinnerProps {
  size?: string;
  color?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 'w-12 h-12', color = '#000' }) => {
  return (
    <div className={`flex items-center justify-center ${size}`}>
      <FaSpinner
        className={`animate-spin ${color} ${size}`}
        style={{ color }}
      />
    </div>
  );
};

export default Spinner;
