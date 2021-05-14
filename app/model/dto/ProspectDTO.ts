import { Position } from "./PositionsEnum";

export class ProspectDTO {
  name: string;
  id: string;
  description: string;
  jerseyNumber: number;
  position: Position
  college: string; 
  size: string; 
  weight: string; 
  draftYear: number;
  createdAt: Date;
}
