import React from 'react';
import { DoorWindow } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface DoorsWindowsProps {
  title: string;
  items: DoorWindow[];
  onChange: (items: DoorWindow[]) => void;
}

const DoorsWindows: React.FC<DoorsWindowsProps> = ({ title, items, onChange }) => {
  const handleAdd = () => {
    const newItem: DoorWindow = {
      id: Date.now().toString(),
      width: 0,
      height: 0
    };
    onChange([...items, newItem]);
  };

  const handleChange = (id: string, field: keyof DoorWindow, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: numValue } : item
    );
    onChange(updatedItems);
  };

  const handleRemove = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    onChange(updatedItems);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 mb-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">{title}</h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No {title.toLowerCase()} added yet.</p>
      ) : (
        items.map((item, index) => (
          <div key={item.id} className="mb-6 p-6 bg-black rounded-xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-300">{title.slice(0, -1)} #{index + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                aria-label={`Remove ${title.slice(0, -1)} #${index + 1}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`width-${item.id}`} className="block text-sm text-gray-400 font-medium">
                  Width (ft)
                </label>
                <input
                  type="text"
                  id={`width-${item.id}`}
                  value={item.width || ''}
                  onChange={(e) => handleChange(item.id, 'width', e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
                  placeholder="Enter width"
                  inputMode="numeric"
                  pattern="[0-9]*\.?[0-9]*"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor={`height-${item.id}`} className="block text-sm text-gray-400 font-medium">
                  Height (ft)
                </label>
                <input
                  type="text"
                  id={`height-${item.id}`}
                  value={item.height || ''}
                  onChange={(e) => handleChange(item.id, 'height', e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-600"
                  placeholder="Enter height"
                  inputMode="numeric"
                  pattern="[0-9]*\.?[0-9]*"
                />
              </div>
            </div>
          </div>
        ))
      )}
      
      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors duration-200 font-medium flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add {title.slice(0, -1)}
      </button>
    </div>
  );
};

export default DoorsWindows;