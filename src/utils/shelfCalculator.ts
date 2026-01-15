import type { Solution, ShelfConfig, ProductRange, RangeConfig } from '../types';
import { RANGE_CONFIGS } from '../config';

const getActualLengths = (unit: 'cm' | 'mm'): Record<number, number> => ({
  [unit === 'mm' ? 500 : 50]: unit === 'mm' ? 501 : 50.1,
  [unit === 'mm' ? 750 : 75]: unit === 'mm' ? 751 : 75.1,
  [unit === 'mm' ? 900 : 90]: unit === 'mm' ? 901 : 90.1,
  [unit === 'mm' ? 1000 : 100]: unit === 'mm' ? 1006 : 100.6
});

const getClassicLengths = (unit: 'cm' | 'mm'): Record<number, number> => ({
  [unit === 'mm' ? 500 : 50]: unit === 'mm' ? 500 : 50.0,
  [unit === 'mm' ? 750 : 75]: unit === 'mm' ? 750 : 75.0,
  [unit === 'mm' ? 900 : 90]: unit === 'mm' ? 900 : 90.0,
  [unit === 'mm' ? 1000 : 100]: unit === 'mm' ? 1005 : 100.5
});

const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const getActualLength = (displayLength: number, range: ProductRange, unit: 'cm' | 'mm'): number => {
  if (range === 'lingo') {
    const lengths = getActualLengths(unit);
    return lengths[displayLength] || displayLength;
  }
  if (range === 'classic' || range === 'classicNoPanel' || range === 'london' || range === 'londonMetal') {
    const lengths = getClassicLengths(unit);
    return lengths[displayLength] || displayLength;
  }
  return displayLength;
};

export function findBestCombination(
  originalLength: number,
  config: ShelfConfig,
  range: ProductRange,
  preferredSizeOptimization: boolean
): Solution {
  const { shelfSizes, idealMaxRemaining, preferredSize, unit } = config;
  const rangeConfig = RANGE_CONFIGS[range];

  let bestSolution: Solution = {
    shelves: [],
    totalLength: 0,
    remainingLength: Number.MAX_VALUE,
    adjustedTargetLength: originalLength,
    totalPanelSpace: 0,
    usesPreferredSize: false
  };

  const evaluateSolution = (
    shelves: { length: number; count: number }[],
    remaining: number,
    usesPreferredSize: boolean
  ): number => {
    if (remaining < 0) return Number.MAX_VALUE;

    let score = remaining * 1000;

    if (preferredSizeOptimization) {
      // Pour l'optimisation privilégiée, favoriser fortement l'utilisation de la taille préférée
      const preferredCount = shelves.find(s => s.length === preferredSize)?.count || 0;
      const totalCount = shelves.reduce((sum, { count }) => sum + count, 0);
      score += (totalCount - preferredCount) * 10000;
    } else {
      // Pour l'optimisation d'espace, pénaliser légèrement la diversité des tailles
      score += shelves.length * 100;
    }

    return score;
  };

  const calculateTotalLength = (
    shelves: { length: number; count: number }[],
    rangeConfig: RangeConfig
  ): number => {
    const expandedLengths: number[] = [];
    shelves.forEach(({ length, count }) => {
      const actualLength = getActualLength(length, range, unit);
      for (let i = 0; i < count; i++) {
        expandedLengths.push(actualLength);
      }
    });
    return rangeConfig.calculateTotalLength(expandedLengths);
  };

  const tryCombinations = (
    remaining: number,
    currentShelves: { length: number; count: number }[],
    startIndex: number
  ) => {
    if (remaining >= 0 && currentShelves.length > 0) {
      const totalShelfLength = currentShelves.reduce(
        (sum, { length, count }) => {
          const actualLength = getActualLength(length, range, unit);
          return sum + actualLength * count;
        },
        0
      );
      const totalShelfLengthRounded = roundToTwoDecimals(totalShelfLength);
      const totalShelves = currentShelves.reduce(
        (sum, { count }) => sum + count,
        0
      );
      const panelSpace = roundToTwoDecimals(rangeConfig.calculateAdjustment(totalShelves, unit));
      const totalLength = roundToTwoDecimals(totalShelfLengthRounded + panelSpace);
      
      const actualRemaining = roundToTwoDecimals(originalLength - totalLength);
      const usesPreferredSize = preferredSize && 
        currentShelves.some(shelf => shelf.length === preferredSize);
      
      if (actualRemaining >= 0) {
        const currentScore = evaluateSolution(currentShelves, actualRemaining, usesPreferredSize);
        const bestScore = evaluateSolution(
          bestSolution.shelves, 
          bestSolution.remainingLength,
          bestSolution.usesPreferredSize
        );
        
        if (currentScore < bestScore) {
          bestSolution = {
            shelves: [...currentShelves],
            totalLength,
            totalShelfLength: totalShelfLengthRounded,
            remainingLength: actualRemaining,
            adjustedTargetLength: originalLength,
            totalPanelSpace: panelSpace,
            usesPreferredSize
          };
        }
      }
    }

    // Si on optimise pour la taille préférée, essayer d'abord celle-ci
    if (preferredSizeOptimization && preferredSize && startIndex === 0) {
      const actualPreferredLength = (range === 'lingo')
        ? getActualLength(preferredSize, range, unit)
        : preferredSize;
      const maxPreferredCount = Math.floor(remaining / actualPreferredLength);
      for (let count = maxPreferredCount; count > 0; count--) {
        tryCombinations(
          remaining - (actualPreferredLength * count),
          [{ length: preferredSize, count }],
          1
        );
      }
    }

    for (let i = startIndex; i < shelfSizes.length; i++) {
      const size = shelfSizes[i];
      if (preferredSizeOptimization && size === preferredSize) continue;
      
      const actualSize = (range === 'lingo')
        ? getActualLength(size, range, unit)
        : size;
      if (actualSize > remaining) continue;

      const maxCount = Math.floor(remaining / actualSize);
      for (let count = maxCount; count > 0; count--) {
        tryCombinations(
          remaining - (actualSize * count),
          [...currentShelves, { length: size, count }],
          i + 1
        );
      }
    }
  };

  tryCombinations(originalLength, [], 0);
  return bestSolution;
}