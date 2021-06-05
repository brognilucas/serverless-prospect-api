/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Position } from "../../utils/enums/PositionsEnum";
import { ProspectsEvaluation } from "../dto/ProspectsEvaluation";
import { CornerbackEvaluation } from "./CornerbackEvaluation";
import { EdgeEvaluation } from "./EdgeEvaluation";
import { InsideDefensiveLinemenEvaluation } from "./InsideDefensiveLinemenEvaluation";
import { LinebackerEvaluation } from "./LinebackerEvaluation";
import { OffensiveLinemenEvaluation } from "./OffensiveLinemenEvaluation";
import { QuarterbackEvaluation } from "./QuarterbackEvaluation";
import { RunningBackEvaluation } from "./RunningBackEvaluation";
import { SafetyEvaluation } from "./SafetyEvaluation";
import { TightEndEvaluation } from "./TightEndEvaluation";
import { WideReceiverEvaluation } from "./WideReceiverEvaluation";

export * from "./CommonEvaluation";
export * from "./CornerbackEvaluation";
export * from "./EdgeEvaluation";
export * from "./InsideDefensiveLinemenEvaluation";
export * from "./LinebackerEvaluation";
export * from "./OffensiveLinemenEvaluation";
export * from "./QuarterbackEvaluation";
export * from "./RunningBackEvaluation";
export * from "./SafetyEvaluation";
export * from "./TightEndEvaluation";
export * from "./WideReceiverEvaluation";

export const createEvaluation = (
  position: Position,
  evaluation: ProspectsEvaluation["evaluation"]
) => {
  switch (position) {
    case Position.CB:
      return new CornerbackEvaluation(evaluation as CornerbackEvaluation);
    case Position.EDGE:
      return new EdgeEvaluation(evaluation as EdgeEvaluation);
    case Position.LB:
      return new LinebackerEvaluation(evaluation as LinebackerEvaluation);
    case Position.OT:
    case Position.iOL:
      return new OffensiveLinemenEvaluation(
        evaluation as OffensiveLinemenEvaluation
      );
    case Position.QB:
      return new QuarterbackEvaluation(evaluation as QuarterbackEvaluation);
    case Position.RB:
      return new RunningBackEvaluation(evaluation as RunningBackEvaluation);
    case Position.S:
      return new SafetyEvaluation(evaluation as SafetyEvaluation);
    case Position.TE:
      return new TightEndEvaluation(evaluation as TightEndEvaluation);
    case Position.WR:
      return new WideReceiverEvaluation(evaluation as WideReceiverEvaluation);
    case Position.iDL:
      return new InsideDefensiveLinemenEvaluation(
        evaluation as InsideDefensiveLinemenEvaluation
      );
    default:
      throw "Trying to evaluate an invalid position";
  }
};
