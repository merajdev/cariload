// components/Spinner.tsx

'use client';

import { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface SpinnerProps {
  size?: string; // Tailwind class size
  color?: string; // Optional color prop
}

const Spinner: FC<SpinnerProps> = ({ size = 'w-20 h-20', color = '#000' }) => {
  return (
    <div className={`flex items-center justify-center ${size}`}>
      <FaSpinner
        className={`animate-spin ${color}`}
        style={{ color }}
      />
    </div>
  );
};

export default Spinner;
