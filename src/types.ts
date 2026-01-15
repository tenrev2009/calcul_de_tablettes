export interface Solution {
  shelves: { length: number; count: number }[];
  totalLength: number;
  totalShelfLength: number;
  remainingLength: number;
  adjustedTargetLength: number;
  totalPanelSpace: number;
  usesPreferredSize: boolean;
}

export interface ShelfConfig {
  shelfSizes: number[];
  idealMaxRemaining: number;
  preferredSize?: number;
  unit: 'cm' | 'mm';
}

export type ProductRange = 'london' | 'classic' | 'classicNoPanel' | 'lingo' | 'londonMetal';
export type Language = 'fr' | 'en';
export type Unit = 'cm' | 'mm';

export interface RangeConfig {
  name: Record<Language, string>;
  description: Record<Language, string>;
  calculateTotalLength: (shelfLengths: number[]) => number;
  calculateAdjustment: (totalShelves: number) => number;
}

export interface CustomShelfSize {
  length: number;
  enabled: boolean;
}