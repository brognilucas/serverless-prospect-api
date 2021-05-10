import { ProspectDTO } from "./ProspectDTO";

export interface ProspectsEvaluation {
    propsect: ProspectDTO['id']; 
    evaluation: QuarterbackEvaluation | RunningBackEvaluation;
}

interface GeneralAspects {
    athleticism: number;
}

export interface RunningBackEvaluation extends GeneralAspects {
    vision: number;
    footwork: number;
    explosion: number;
    durability: number; 
    contactBalance: number; 
    versatility: number;
    elusiviness: number;
    ballSecutity: number; 
    bigPlayHability: number;
}

export interface QuarterbackEvaluation extends GeneralAspects {
    accuracy: number; 
    decistionMaking: number; 
    poise: number;
    progressions: number;
    release: number;
    pocketManipulation: number; 
    armStrength: number;
    mobility: number;
    leadership: number;
    throwingMechanics: number;
}