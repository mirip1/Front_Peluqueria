export interface HorarioDTO {
  id: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  estado: 'DISPONIBLE' | 'NO_DISPONIBLE';
  isException?: boolean;

}

export interface DisponibilidadDiaDTO {
  fecha: string;
  franjas: HorarioDTO[];
  excepciones?: HorarioDTO[];

}

export interface Segmento {
  startTime: string;
  endTime:   string;
  estado:    'DISPONIBLE' | 'NO_DISPONIBLE';
}
