import React from 'react';
import { CalculationResult } from '../types';
import { Droplets } from 'lucide-react';

interface PaintResultsProps {
  result: CalculationResult | null;
}

const PaintResults: React.FC<PaintResultsProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 mb-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Results</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black p-4 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm font-medium">Total Wall Area</p>
            <p className="text-2xl font-bold text-white mt-1">{formatNumber(result.wallArea)} m²</p>
          </div>
          
          <div className="bg-black p-4 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm font-medium">Doors & Windows Area</p>
            <p className="text-2xl font-bold text-white mt-1">{formatNumber(result.doorWindowArea)} m²</p>
          </div>
          
          <div className="bg-black p-4 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm font-medium">Paintable Area</p>
            <p className="text-2xl font-bold text-white mt-1">{formatNumber(result.paintableArea)} m²</p>
          </div>
          
          <div className="bg-black p-4 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm font-medium">Coverage Per Liter</p>
            <p className="text-2xl font-bold text-white mt-1">{formatNumber(result.coverage)} m²</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 rounded-xl text-center">
          <div className="flex items-center justify-center mb-2">
            <Droplets className="w-8 h-8 text-white/90" />
          </div>
          <h3 className="text-xl font-medium text-white/90 mb-2">Paint Needed</h3>
          <p className="text-4xl font-bold text-white">
            {formatNumber(result.paintNeeded)} {result.paintNeeded === 1 ? 'Liter' : 'Liters'}
          </p>
        </div>
        
        <div className="bg-black p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Calculation Details</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Total wall area calculated from room dimensions
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Subtracted door and window area from total wall area
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Multiplied by number of coats to get total paint area
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Divided by paint coverage rate per liter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintResults;