export interface Cita {
  id: number;
  usuarioId: number;
  fechaYHora: string;
  estado: 'ACTIVA' | 'CANCELADA' | 'FINALIZADA';
  usuarioEmail: string;
}
