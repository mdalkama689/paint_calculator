import React from 'react';
import { PaintBucket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-12">
      <div className="flex items-center justify-center py-8">
        <PaintBucket className="w-10 h-10 mr-4 text-indigo-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Paint Calculator
        </h1>
      </div>
      <p className="text-center text-gray-400 max-w-2xl mx-auto text-lg">
        Determine exactly how much paint you need for your next project with precision and ease.
      </p>
    </header>
  );
};

export default Header;