import {
  CornerbackEvaluation,
  EdgeEvaluation,
  InsideDefensiveLinemenEvaluation,
  LinebackerEvaluation,
  OffensiveLinemenEvaluation,
  QuarterbackEvaluation,
  RunningBackEvaluation,
  SafetyEvaluation,
  TightEndEvaluation,
  WideReceiverEvaluation,
} from "../evaluations";
import { ProspectDTO } from "./ProspectDTO";
import { User } from "./User";

export class ProspectsEvaluation {
  prospect: ProspectDTO["id"];
  evaluation?:
    | QuarterbackEvaluation
    | RunningBackEvaluation
    | TightEndEvaluation
    | OffensiveLinemenEvaluation
    | InsideDefensiveLinemenEvaluation
    | EdgeEvaluation
    | CornerbackEvaluation
    | LinebackerEvaluation
    | SafetyEvaluation
    | WideReceiverEvaluation;
  user: User["username"];
}
