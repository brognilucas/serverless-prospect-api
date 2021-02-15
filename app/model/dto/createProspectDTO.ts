import { Position } from "./PositionsEnum";

export class CreateProspectDTO {
  name: string;
  id: string;
  description?: string;
  jerseyNumber?: number;
  position?: Position
  college: string; 
  size?: string; 
  weight?: string; 
}
