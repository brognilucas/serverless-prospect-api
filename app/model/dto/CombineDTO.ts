import { ProspectDTO } from "./ProspectDTO";

export interface Combine {
    handSize: string;
    verticalJump: number;
    benchReps: number;
    broadJump: string;
    fortyYardsDash: number;
    threeConeDrill: number;
    twentyYardsShuttle: number;
    prospect: ProspectDTO['id']
}
