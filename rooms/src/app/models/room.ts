export interface Room {
  id?: string;
  name: string;
  floor: string;
  capacity: number;
  lastInspection: Date;
  status: "Under Maintenance" | "Available";
}
