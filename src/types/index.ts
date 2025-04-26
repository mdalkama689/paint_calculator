export interface RoomDimensions {
  height: number;
  width: number;
  length: number;
  coats: number;
}

export interface DoorWindow {
  id: string;
  width: number;
  height: number;
}

export interface CalculationResult {
  wallArea: number;
  doorWindowArea: number;
  paintableArea: number;
  paintNeeded: number;
  coverage: number;
}