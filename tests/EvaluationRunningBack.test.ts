import { RunningBackEvaluation } from "../app/model/dto/ProspectsEvaluation"
import { expect } from "chai";
import { mockRunningBack8585, mockRunningBackEvaluation } from "./EvaluationRunningBack.mock"

describe('Unit EvaluationRunningBack', () => {
    it('Should calculation to be 10', () => {
        const evaluation = new RunningBackEvaluation(mockRunningBackEvaluation);

        expect(evaluation.getOverall()).to.eql(10);
    })

    it('Should calculation to be 8.5475', () => {
        const evaluation = new RunningBackEvaluation( mockRunningBack8585 as RunningBackEvaluation);

        expect(evaluation.getOverall()).to.eql(8.585);
    })
})