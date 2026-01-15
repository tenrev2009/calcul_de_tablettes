import React from 'react';
import type { Solution, ProductRange, Language, Unit } from '../types';
import { RANGE_CONFIGS } from '../config';
import { translations } from '../translations';

const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

interface Props {
  solution: Solution;
  desiredLength: number;
  selectedRange: ProductRange;
  language: Language;
  preferredSize?: number;
  unit: Unit;
  isPreferredOptimized?: boolean;
}

export function SolutionDisplay({ 
  solution, 
  desiredLength, 
  selectedRange, 
  language,
  preferredSize,
  unit,
  isPreferredOptimized
}: Props) {
  const rangeConfig = RANGE_CONFIGS[selectedRange];
  const t = translations[language];

  const formatNumber = (value: number): string => {
    return roundToTwoDecimals(value).toFixed(2);
  };

  const totalWithPanels = solution.totalLength;
  const totalShelfLength = solution.totalShelfLength;

  return (
    <div className="mt-8 bg-indigo-50 rounded-xl p-6">
      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between text-lg font-medium text-gray-800">
          <span>{t.totalRequestedLength}:</span>
          <span>{desiredLength} {unit}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t.proposedSolution}
      </h2>
      {preferredSize && (
        <div className="mb-4 text-sm">
          <span className="font-medium text-indigo-600">
            {isPreferredOptimized ? t.optimizedPreferred : t.optimizedSpace}
          </span>
        </div>
      )}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{t.selectedRange}:</span>
            <span className="font-medium">{rangeConfig.name[language]}</span>
          </div>
        </div>

        {solution.shelves
          .filter(({ count }) => count > 0)
          .map(({ length, count }, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between bg-white p-4 rounded-lg shadow ${
                length === preferredSize ? 'border-l-4 border-indigo-500' : ''
              }`}
            >
              <div className="flex flex-col">
                <span className="text-gray-700">
                  {t.shelvesOf} {formatNumber(length)} {unit}
                </span>
              </div>
              <span className="font-semibold text-indigo-600">
                × {count}
              </span>
            </div>
          ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t.totalShelfLength}:</span>
            <span className="font-medium">
              {formatNumber(totalShelfLength)} {unit}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">{t.panelSpace}:</span>
            <span className="font-medium">{formatNumber(solution.totalPanelSpace)} {unit}</span>
          </div>
          <div className="flex justify-between text-base mt-3 pt-3 border-t font-bold text-gray-800">
            <span>{t.totalWithPanels}:</span>
            <span>
              {formatNumber(totalWithPanels)} {unit}
            </span>
          </div>
          <div className={`flex justify-between text-sm mt-2 ${
            solution.remainingLength <= 2
              ? 'text-green-600' 
              : 'text-amber-600'
          }`}>
            <span>{t.remainingSpace}:</span>
            <span className="font-medium">{formatNumber(solution.remainingLength)} {unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}