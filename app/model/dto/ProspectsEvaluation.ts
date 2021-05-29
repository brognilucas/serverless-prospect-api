import {
  CornerbackEvaluation, EdgeEvaluation, InsideDefensiveLinemenEvaluation,
  LinebackerEvaluation, OffensiveLinemenEvaluation, QuarterbackEvaluation, RunningBackEvaluation,
  SafetyEvaluation, TightEndEvaluation, WideReceiverEvaluation
} from '../evaluations'
import { ProspectDTO } from "./ProspectDTO";

export class ProspectsEvaluation {
  propsect: ProspectDTO['id'];
  evaluation: QuarterbackEvaluation | RunningBackEvaluation | TightEndEvaluation
    | OffensiveLinemenEvaluation | InsideDefensiveLinemenEvaluation | EdgeEvaluation
    | CornerbackEvaluation | LinebackerEvaluation | SafetyEvaluation | WideReceiverEvaluation;
  user: string;
}

