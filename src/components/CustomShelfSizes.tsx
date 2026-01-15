import React from 'react';
import type { CustomShelfSize, Language, Unit } from '../types';
import { Trash2, Plus } from 'lucide-react';
import { translations } from '../translations';

interface Props {
  shelfSizes: CustomShelfSize[];
  onChange: (sizes: CustomShelfSize[]) => void;
  language: Language;
  preferredSize: number | undefined;
  onPreferredSizeChange: (size: number | undefined) => void;
  unit: Unit;
}

export function CustomShelfSizes({ 
  shelfSizes, 
  onChange, 
  language,
  preferredSize,
  onPreferredSizeChange,
  unit
}: Props) {
  const t = translations[language];

  const formatValue = (value: number): number => {
    return unit === 'mm' ? value * 10 : value;
  };

  const parseValue = (value: number): number => {
    return unit === 'mm' ? value / 10 : value;
  };

  const handleAdd = () => {
    onChange([...shelfSizes, { length: 50, enabled: true }]);
  };

  const handleRemove = (index: number) => {
    onChange(shelfSizes.filter((_, i) => i !== index));
    if (preferredSize === shelfSizes[index].length) {
      onPreferredSizeChange(undefined);
    }
  };

  const handleChange = (index: number, displayValue: number) => {
    const newSizes = [...shelfSizes];
    newSizes[index] = { ...newSizes[index], length: parseValue(displayValue) };
    onChange(newSizes);
    if (preferredSize === shelfSizes[index].length) {
      onPreferredSizeChange(parseValue(displayValue));
    }
  };

  const handleToggle = (index: number) => {
    const newSizes = [...shelfSizes];
    newSizes[index] = { ...newSizes[index], enabled: !newSizes[index].enabled };
    onChange(newSizes);
    if (!newSizes[index].enabled && preferredSize === newSizes[index].length) {
      onPreferredSizeChange(undefined);
    }
  };

  const handlePreferredToggle = (size: number) => {
    onPreferredSizeChange(preferredSize === size ? undefined : size);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {t.availableSizes}
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors touch-manipulation"
        >
          <Plus className="w-4 h-4" />
          {t.addSize}
        </button>
      </div>
      <div className="space-y-4">
        {shelfSizes.map((size, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min={unit === 'mm' ? 100 : 10}
                max={unit === 'mm' ? 3000 : 300}
                value={formatValue(size.length)}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className="w-24 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-gray-600">{unit}</span>
              <button
                onClick={() => handleRemove(index)}
                className="ml-auto p-2 text-gray-400 hover:text-red-500 active:text-red-600 transition-colors touch-manipulation"
                disabled={shelfSizes.length <= 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
                <input
                  type="checkbox"
                  checked={size.enabled}
                  onChange={() => handleToggle(index)}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{t.enabled}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
                <input
                  type="checkbox"
                  checked={preferredSize === size.length}
                  onChange={() => handlePreferredToggle(size.length)}
                  disabled={!size.enabled}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{t.preferred}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}