import React, { useState, useEffect } from 'react';
import { Calculator, PlayCircle } from 'lucide-react';
import { getDefaultShelfSizes, IDEAL_MAX_REMAINING } from './config';
import { findBestCombination } from './utils/shelfCalculator';
import { CustomShelfSizes } from './components/CustomShelfSizes';
import { RangeSelector } from './components/RangeSelector';
import { SolutionDisplay } from './components/SolutionDisplay';
import { LanguageSelector } from './components/LanguageSelector';
import { UnitSelector } from './components/UnitSelector';
import { translations } from './translations';
import type { Solution, ProductRange, CustomShelfSize, Language, Unit } from './types';

function App() {
  const [desiredLength, setDesiredLength] = useState<number>(0);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [selectedRange, setSelectedRange] = useState<ProductRange>('london');
  const [language, setLanguage] = useState<Language>('fr');
  const [preferredSize, setPreferredSize] = useState<number | undefined>();
  const [unit, setUnit] = useState<Unit>('cm');
  const [shelfSizes, setShelfSizes] = useState<CustomShelfSize[]>(getDefaultShelfSizes(unit));

  useEffect(() => {
    setShelfSizes(getDefaultShelfSizes(unit));
  }, [unit]);

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const enabledSizes = shelfSizes
      .filter(size => size.enabled)
      .map(size => size.length)
      .sort((a, b) => b - a);

    if (enabledSizes.length === 0) {
      alert(t.noShelfSizes);
      return;
    }

    // Find space-optimized solution
    const idealMaxRemaining = IDEAL_MAX_REMAINING(unit);
    const spaceOptimized = findBestCombination(
      desiredLength,
      {
        shelfSizes: enabledSizes,
        idealMaxRemaining,
        preferredSize,
        unit
      },
      selectedRange,
      false
    );

    const solutions = [spaceOptimized];

    // If preferred size is set, find preferred-size-optimized solution
    if (preferredSize) {
      const preferredOptimized = findBestCombination(
        desiredLength,
        {
          shelfSizes: enabledSizes,
          idealMaxRemaining,
          preferredSize,
          unit
        },
        selectedRange,
        true
      );

      // Only add if it's different from space-optimized solution
      if (JSON.stringify(preferredOptimized) !== JSON.stringify(spaceOptimized)) {
        solutions.push(preferredOptimized);
      }
    }
    
    setSolutions(solutions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {t.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <UnitSelector 
                unit={unit}
                onChange={setUnit}
                language={language}
              />
              <LanguageSelector 
                language={language}
                onChange={setLanguage}
              />
            </div>
          </div>

          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              {t.appDescription}
            </p>
            <a
              href="https://www.canva.com/design/DAGXaxH97W4/pBU5Ylz0CuWqDF8R9wFgXA/watch?utm_content=DAGXaxH97W4&utm_campaign=designshare&utm_medium=link&utm_source=editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <PlayCircle className="w-5 h-5" />
              {t.watchTutorial}
            </a>
          </div>

          <RangeSelector
            selectedRange={selectedRange}
            onChange={setSelectedRange}
            language={language}
          />

          <CustomShelfSizes
            shelfSizes={shelfSizes}
            onChange={setShelfSizes}
            language={language}
            preferredSize={preferredSize}
            onPreferredSizeChange={setPreferredSize}
            unit={unit}
          />

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-xl border-2 border-indigo-200 shadow-md">
              <label 
                htmlFor="length" 
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                {t.desiredLength} ({unit})
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="length"
                  min={1}
                  value={desiredLength}
                  onChange={(e) => setDesiredLength(Number(e.target.value))}
                  className="flex-1 h-12 text-lg rounded-lg border-2 border-indigo-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2"
                  required
                />
                <button
                  type="submit"
                  className="px-8 h-12 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm hover:shadow-md touch-manipulation"
                >
                  {t.calculate}
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600 italic">
                {t.enterDimensionsHint}
              </p>
            </div>
          </form>

          {solutions.map((solution, index) => (
            <SolutionDisplay 
              key={index}
              solution={solution}
              desiredLength={desiredLength}
              selectedRange={selectedRange}
              language={language}
              preferredSize={preferredSize}
              unit={unit}
              isPreferredOptimized={index === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;