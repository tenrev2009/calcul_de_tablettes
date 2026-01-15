import React from 'react';
import type { ShelfConfig } from '../types';

interface Props {
  config: ShelfConfig;
}

export function ShelfSizes({ config }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tailles d'étagères disponibles
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.SHELF_SIZES.map((size) => (
          <div 
            key={size}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <span className="text-lg font-medium text-gray-900">
              {size} cm
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}