export interface UsuarioDTO {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: 'CLIENTE' | 'ADMIN';
  baneado: boolean;
  fecha: string;
}
export interface ChangeEmailResponse {
  usuario: UsuarioDTO;
  token:   string;
}
