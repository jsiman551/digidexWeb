'use client';

import { useState } from 'react';

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-900 text-white text-sm p-2 rounded shadow-lg">
          {label}
        </div>
      )}
    </span>
  );
}
