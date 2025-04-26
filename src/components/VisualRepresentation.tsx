import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { CalculationResult } from '../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface VisualRepresentationProps {
  result: CalculationResult | null;
}

const VisualRepresentation: React.FC<VisualRepresentationProps> = ({ result }) => {
  const [chartType, setChartType] = useState<'doughnut' | 'bar'>('doughnut');

  if (!result) {
    return null;
  }

  const doughnutData = {
    labels: ['Paintable Area', 'Doors & Windows Area'],
    datasets: [
      {
        data: [result.paintableArea, result.doorWindowArea],
        backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(168, 85, 247, 0.8)'],
        borderColor: ['rgba(99, 102, 241, 1)', 'rgba(168, 85, 247, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Wall Area', 'Doors & Windows', 'Paintable Area'],
    datasets: [
      {
        label: 'Square Meters',
        data: [result.wallArea, result.doorWindowArea, result.paintableArea],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(209, 213, 219)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(243, 244, 246)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: chartType === 'bar' ? {
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    } : undefined,
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800 animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-col gap-3 sm:gap-0 sm:flex-row">
        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Visual Breakdown</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 text-sm rounded-xl transition-colors ${
              chartType === 'doughnut'
                ? 'bg-indigo-600 text-white'
                : 'bg-black text-gray-300 hover:bg-gray-900 border border-gray-800'
            }`}
            onClick={() => setChartType('doughnut')}
          >
            Doughnut
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-xl transition-colors ${
              chartType === 'bar'
                ? 'bg-indigo-600 text-white'
                : 'bg-black text-gray-300 hover:bg-gray-900 border border-gray-800'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div className="h-[400px]">
        {chartType === 'doughnut' ? (
          <Doughnut data={doughnutData} options={options} />
        ) : (
          <Bar data={barData} options={options} />
        )}
      </div>
    </div>
  );
};

export default VisualRepresentation;