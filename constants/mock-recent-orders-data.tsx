export interface RecentShipment {
  id: number;
  recipient: string;
  status: string;
  color: string;
}

export const RECENT_SHIPMENTS: RecentShipment[] = [
  {
    id: 1,
    recipient: "Saúl López",
    status: "Completado",
    color: "#4CAF50",
  },
  {
    id: 2,
    recipient: "Saúl López",
    status: "Pendiente",
    color: "#FF9800",
  },
  {
    id: 3,
    recipient: "Saúl López",
    status: "Atrasar",
    color: "#F44336",
  },
];
