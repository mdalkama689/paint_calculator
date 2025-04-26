import React, { useState, useEffect, useRef } from 'react';
import RoomDimensions from './RoomDimensions';
import DoorsWindows from './DoorsWindows';
import PaintResults from './PaintResults';
import VisualRepresentation from './VisualRepresentation';
import { RoomDimensions as RoomDimensionsType, DoorWindow, CalculationResult } from '../types';
import { calculatePaintNeeded } from '../utils/calculations';
import { CalculatorIcon, PenTool, RotateCcw } from 'lucide-react';

const PaintCalculator: React.FC = () => {
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensionsType>({
    height: 8,
    width: 12,
    length: 15,
    coats: 2
  });
  
  const [doors, setDoors] = useState<DoorWindow[]>([]);
  const [windows, setWindows] = useState<DoorWindow[]>([]);
  const [coverage, setCoverage] = useState<number>(10);
  const [coats, setCoats] = useState<number>(2);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const hasValidDimensions = 
      roomDimensions.height > 0 && 
      roomDimensions.width > 0 && 
      roomDimensions.length > 0 && 
      coats > 0;
      
    if (hasValidDimensions) {
      const calculationResult = calculatePaintNeeded(
        { ...roomDimensions, coats },
        doors,
        windows,
        coverage
      );
      setResult(calculationResult);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleReset = () => {
    setRoomDimensions({
      height: 8,
      width: 12,
      length: 15,
      coats: 2
    });
    setDoors([]);
    setWindows([]);
    setCoverage(10);
    setCoats(2);
    setResult(null);
  };

  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setCoverage(value);
  };

  const handleCoatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setCoats(value);
  };

  const getCoatingRecommendation = () => {
    if (result) {
      if (result.wallArea > 50) return 3;
      if (result.wallArea > 30) return 2;
      return 1;
    }
    return 2;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-6">
        <RoomDimensions 
          dimensions={roomDimensions} 
          onChange={setRoomDimensions} 
        />
        
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Paint Coverage</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="coverage" className="block text-gray-300">
                Coverage per Liter (m²)
              </label>
              <input
                type="text"
                id="coverage"
                value={coverage || ''}
                onChange={handleCoverageChange}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
                placeholder="Enter coverage per liter"
                inputMode="numeric"
                pattern="[0-9]*\.?[0-9]*"
              />
              <p className="text-sm text-gray-400">
                Standard interior paint typically covers 8-10 m² per liter.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="coats" className="block text-gray-300">
                Number of Coats
              </label>
              <input
                type="text"
                id="coats"
                value={coats || ''}
                onChange={handleCoatsChange}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
                placeholder="Enter number of coats"
                inputMode="numeric"
                pattern="[0-9]*\.?[0-9]*"
              />
              <p className="text-sm text-gray-400">
                Default is 2 coats. Adjust based on paint type and surface requirements.
              </p>
            </div>
          </div>
        </div>
        
        <DoorsWindows 
          title="Doors" 
          items={doors} 
          onChange={setDoors} 
        />
        
        <DoorsWindows 
          title="Windows" 
          items={windows} 
          onChange={setWindows} 
        />

        <div className="flex gap-4">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CalculatorIcon className="w-5 h-5" />
            Calculate Paint Needed
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-4 bg-black text-gray-300 hover:bg-gray-900 border border-gray-800 rounded-xl transition-colors flex items-center justify-center"
            title="Reset all values"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {result ? (
          <div ref={resultRef}>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Coating Recommendation</h2>
              <div className="bg-black rounded-xl p-6 border border-gray-800">
                <p className="text-gray-300">
                  Based on your room size and surface area, we recommend{' '}
                  <span className="text-indigo-400 font-semibold">
                    {getCoatingRecommendation()} coat{getCoatingRecommendation() > 1 ? 's' : ''}
                  </span>{' '}
                  of paint for optimal coverage.
                </p>
              </div>
            </div>
            <PaintResults result={result} />
            <VisualRepresentation result={result} />
          </div>
        ) : (
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 text-center">
            <CalculatorIcon className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Enter Room Details</h2>
            <p className="text-gray-400">
              Fill in the room dimensions to calculate the amount of paint needed.
            </p>
          </div>
        )}
        
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800">
          <div className="flex items-center mb-4">
            <PenTool className="w-5 h-5 mr-2 text-indigo-500" />
            <h3 className="text-lg font-medium text-white">Tips</h3>
          </div>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• For more accurate results, measure your room dimensions carefully.</li>
            <li>• Don't forget to account for all doors and windows.</li>
            <li>• Most paints require 2 coats for proper coverage.</li>
            <li>• Consider adding an extra 10% for touch-ups and mistakes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaintCalculator;