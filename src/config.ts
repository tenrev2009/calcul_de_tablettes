import type { RangeConfig, ProductRange, Language } from './types';

export const getDefaultShelfSizes = (unit: 'cm' | 'mm') => {
  const multiplier = unit === 'mm' ? 10 : 1;
  return [
    { length: 1000 * (unit === 'mm' ? 1 : 0.1), enabled: true },
    { length: 900 * (unit === 'mm' ? 1 : 0.1), enabled: true },
    { length: 750 * (unit === 'mm' ? 1 : 0.1), enabled: true },
    { length: 500 * (unit === 'mm' ? 1 : 0.1), enabled: true }
  ];
};

export const IDEAL_MAX_REMAINING = (unit: 'cm' | 'mm') => unit === 'mm' ? 20 : 2;

export const RANGE_CONFIGS: Record<ProductRange, RangeConfig> = {
  londonMetal: {
    name: {
      fr: 'London (avec panneaux 45 mm)',
      en: 'London (with 45 mm panels)'
    },
    description: {
      fr: 'Longueur des étagères + 9 cm (panneaux métal de 45 mm) + 6 mm de jeu',
      en: 'Shelf length + 9 cm (45 mm metal panels) + 6 mm clearance'
    },
    calculateTotalLength: (shelfLengths, unit: 'cm' | 'mm') => {
      const adjustment = unit === 'mm' ? 96 : 9.6;
      return shelfLengths.reduce((sum, length) => sum + length, 0) + adjustment;
    },
    calculateAdjustment: (totalShelves: number, unit: 'cm' | 'mm') => unit === 'mm' ? 96 : 9.6
  },
  london: {
    name: {
      fr: 'London (avec panneaux 30 mm)',
      en: 'London (with 30 mm panels)'
    },
    description: {
      fr: 'Longueur des étagères + 6 cm (panneaux de 30 mm) + 6 mm de jeu',
      en: 'Shelf length + 6 cm (30 mm panels) + 6 mm clearance'
    },
    calculateTotalLength: (shelfLengths, unit: 'cm' | 'mm') => {
      const adjustment = unit === 'mm' ? 66 : 6.6;
      return shelfLengths.reduce((sum, length) => sum + length, 0) + adjustment;
    },
    calculateAdjustment: (totalShelves: number, unit: 'cm' | 'mm') => unit === 'mm' ? 66 : 6.6
  },
  classic: {
    name: {
      fr: 'Classic (avec panneaux 19 mm)',
      en: 'Classic (with 19 mm panels)'
    },
    description: {
      fr: 'Longueur des étagères + 6.8 cm (panneaux de 19 mm) sans jeu',
      en: 'Shelf length + 6.8 cm (19 mm panels) without clearance'
    },
    calculateTotalLength: (shelfLengths, unit: 'cm' | 'mm') => {
      const adjustment = unit === 'mm' ? 68 : 6.8;
      return shelfLengths.reduce((sum, length) => sum + length, 0) + adjustment;
    },
    calculateAdjustment: (totalShelves: number, unit: 'cm' | 'mm') => unit === 'mm' ? 68 : 6.8
  },
  classicNoPanel: {
    name: {
      fr: 'Classic sans habillage',
      en: 'Classic without panels'
    },
    description: {
      fr: 'Longueur nominale exacte des étagères + 3 cm (montant métal) + 1 cm vérins de réglage',
      en: 'Exact nominal shelf length + 3 cm (metal frame) + 1 cm adjustment feet'
    },
    calculateTotalLength: (shelfLengths, unit: 'cm' | 'mm') => {
      const adjustment = unit === 'mm' ? 40 : 4;
      return shelfLengths.reduce((sum, length) => sum + length, 0) + adjustment;
    },
    calculateAdjustment: (totalShelves: number, unit: 'cm' | 'mm') => unit === 'mm' ? 40 : 4
  },
  lingo: {
    name: {
      fr: 'Lingo (avec panneaux 25 mm)',
      en: 'Lingo (with 25 mm panels)'
    },
    description: {
      fr: 'Panneaux de 2.5 cm entre chaque étagère et aux extrémités (panneaux de 25 mm)',
      en: '2.5 cm panels between each shelf and at ends (25 mm panels)'
    },
    calculateTotalLength: (shelfLengths, unit: 'cm' | 'mm') => {
      const totalShelves = shelfLengths.length;
      const panelSize = unit === 'mm' ? 25 : 2.5;
      const panelSpace = (totalShelves + 1) * (unit === 'mm' ? 25 : 2.5);
      return shelfLengths.reduce((sum, length) => sum + length, 0) + panelSpace;
    },
    calculateAdjustment: (totalShelves: number, unit: 'cm' | 'mm') => {
      return (totalShelves + 1) * (unit === 'mm' ? 25 : 2.5);
    }
  }
};