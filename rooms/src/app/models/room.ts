export interface Room {
  id?: number
  name: string
  floor: string
  capacity: number
  lastInspection?: string
  status: 'Under Maintenance' | 'Available'
}
