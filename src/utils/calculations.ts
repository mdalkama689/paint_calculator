import { RoomDimensions, DoorWindow, CalculationResult } from '../types';

// Standard paint coverage in square meters per liter (1 gallon = 3.78541 liters)
const DEFAULT_COVERAGE = 10; // Approximately 10 square meters per liter

export const calculatePaintNeeded = (
  roomDimensions: RoomDimensions,
  doors: DoorWindow[],
  windows: DoorWindow[],
  coveragePerLiter: number = DEFAULT_COVERAGE
): CalculationResult => {
  // Calculate wall area
  const { height, width, length, coats } = roomDimensions;
  
  // Convert feet to meters (1 foot = 0.3048 meters)
  const heightM = height * 0.3048;
  const widthM = width * 0.3048;
  const lengthM = length * 0.3048;
  
  // Calculate the total wall area in square meters
  const wallArea = 2 * (lengthM * heightM + widthM * heightM);
  
  // Calculate doors and windows area in square meters
  const doorWindowArea = [...doors, ...windows].reduce(
    (total, item) => total + (item.width * 0.3048) * (item.height * 0.3048),
    0
  );
  
  // Calculate paintable area
  const paintableArea = wallArea - doorWindowArea;
  
  // Calculate paint needed in liters
  const paintNeeded = (paintableArea * coats) / coveragePerLiter;
  
  return {
    wallArea,
    doorWindowArea,
    paintableArea,
    paintNeeded,
    coverage: coveragePerLiter
  };
};