import React from 'react';
import { RoomDimensions } from '../types';

interface RoomDimensionsProps {
  dimensions: RoomDimensions;
  onChange: (dimensions: RoomDimensions) => void;
}

const RoomDimensionsComponent: React.FC<RoomDimensionsProps> = ({ dimensions, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    onChange({
      ...dimensions,
      [name]: numValue
    });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 mb-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Room Dimensions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label htmlFor="height" className="block text-gray-300 font-medium">
            Height (ft)
          </label>
          <input
            type="text"
            id="height"
            name="height"
            value={dimensions.height || ''}
            onChange={handleChange}
            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
            placeholder="Enter height"
            inputMode="numeric"
            pattern="[0-9]*\.?[0-9]*"
          />
        </div>
        
        <div className="space-y-3">
          <label htmlFor="width" className="block text-gray-300 font-medium">
            Width (ft)
          </label>
          <input
            type="text"
            id="width"
            name="width"
            value={dimensions.width || ''}
            onChange={handleChange}
            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
            placeholder="Enter width"
            inputMode="numeric"
            pattern="[0-9]*\.?[0-9]*"
          />
        </div>
        
        <div className="space-y-3">
          <label htmlFor="length" className="block text-gray-300 font-medium">
            Length (ft)
          </label>
          <input
            type="text"
            id="length"
            name="length"
            value={dimensions.length || ''}
            onChange={handleChange}
            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
            placeholder="Enter length"
            inputMode="numeric"
            pattern="[0-9]*\.?[0-9]*"
          />
        </div>
        
        <div className="space-y-3">
          <label htmlFor="coats" className="block text-gray-300 font-medium">
            Number of Coats
          </label>
          <input
            type="text"
            id="coats"
            name="coats"
            value={dimensions.coats || ''}
            onChange={handleChange}
            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
            placeholder="Enter number of coats"
            inputMode="numeric"
            pattern="[0-9]*\.?[0-9]*"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDimensionsComponent;