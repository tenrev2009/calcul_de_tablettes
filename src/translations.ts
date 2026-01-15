import type { Language, Unit } from './types';

export const translations: Record<Language, Record<string, string>> = {
  fr: {
    title: 'Calculateur d\'Étagères',
    selectRange: 'Sélectionnez une gamme',
    availableSizes: 'Tailles d\'étagères disponibles',
    addSize: 'Ajouter',
    enabled: 'Activé',
    preferred: 'Privilégiée',
    enterDimensionsHint: 'Entrez la dimension totale souhaitée pour calculer la disposition optimale des étagères',
    desiredLength: 'Donner la longueur sur laquelle les étagères seront réparties et optimisées',
    calculate: 'Calculer',
    proposedSolution: 'Solution proposée',
    totalRequestedLength: 'Longueur totale demandée',
    selectedRange: 'Gamme sélectionnée',
    shelvesOf: 'Étagères de',
    actualLength: 'Longueur réelle avec jeu',
    totalShelfLength: 'Longueur totale des étagères',
    panelSpace: 'Espace pour les panneaux',
    totalWithPanels: 'Longueur totale avec panneaux',
    remainingSpace: 'Espace restant',
    noShelfSizes: 'Veuillez activer au moins une taille d\'étagère',
    preferredSize: 'Taille privilégiée pour optimisation des coûts',
    preferredSizeUsed: 'Solution optimisée pour la taille privilégiée',
    mixedSolution: 'Solution optimisée pour l\'espace',
    unit: 'Unité',
    optimizedSpace: 'Optimisé pour l\'espace',
    optimizedPreferred: 'Optimisé pour la taille privilégiée',
    appDescription: 'Cette application permet de calculer le nombre et les longueurs d\'un ensemble de sections de rayonnages selon une cote d\'ensemble rentrée par l\'utilisateur.',
    watchTutorial: 'Regarder le tutoriel'
  },
  en: {
    title: 'Shelf Calculator',
    selectRange: 'Select a range',
    availableSizes: 'Available shelf sizes',
    addSize: 'Add',
    enabled: 'Enabled',
    preferred: 'Preferred',
    enterDimensionsHint: 'Enter the total desired dimension to calculate the optimal shelf layout',
    desiredLength: 'Enter the length on which the shelves will be distributed and optimized',
    calculate: 'Calculate',
    proposedSolution: 'Proposed solution',
    totalRequestedLength: 'Total requested length',
    selectedRange: 'Selected range',
    shelvesOf: 'Shelves of',
    actualLength: 'Actual length with clearance',
    totalShelfLength: 'Total shelf length',
    panelSpace: 'Panel space',
    totalWithPanels: 'Total length with panels',
    remainingSpace: 'Remaining space',
    noShelfSizes: 'Please enable at least one shelf size',
    preferredSize: 'Preferred size for cost optimization',
    preferredSizeUsed: 'Solution optimized for preferred size',
    mixedSolution: 'Solution optimized for space',
    unit: 'Unit',
    optimizedSpace: 'Space optimized',
    optimizedPreferred: 'Preferred size optimized',
    appDescription: 'Transform your shelving projects with our intelligent Shelf Calculator - the ultimate tool for precise and efficient shelving layout optimization. Whether you\'re planning retail displays, warehouse storage, or custom furniture solutions, our calculator takes the guesswork out of shelf arrangement. Simply enter your desired total length, and let our smart algorithm calculate the optimal combination of shelf sizes, complete with precise spacing and panel considerations. Features include dual optimization modes for space efficiency or cost-effectiveness, support for multiple product ranges, and real-time calculations that account for operational clearances. Save time, reduce waste, and achieve perfect shelf configurations every time.',
    watchTutorial: 'Watch tutorial'
  }
};

export const unitLabels: Record<Unit, Record<Language, string>> = {
  cm: {
    fr: 'cm',
    en: 'cm'
  },
  mm: {
    fr: 'mm',
    en: 'mm'
  }
};