export interface RecentShipment {
  id: number;
  recipient: string;
  status: string;
  color: string;
}

export const RECENT_SHIPMENTS: RecentShipment[] = [
  {
    id: 1,
    recipient: "Test Test",
    status: "Completado",
    color: "#4CAF50",
  },
  {
    id: 2,
    recipient: "Test Test",
    status: "Pendiente",
    color: "#FF9800",
  },
  {
    id: 3,
    recipient: "Test Test",
    status: "Atrasado",
    color: "#F44336",
  },
];
