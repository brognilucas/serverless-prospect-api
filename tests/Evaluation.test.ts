import { CornerbackEvaluation, EdgeEvaluation, InsideDefensiveLinemenEvaluation, LinebackerEvaluation, OffensiveLinemenEvaluation, QuarterbackEvaluation, RunningBackEvaluation, SafetyEvaluation, TightEndEvaluation, WideReceiverEvaluation } from "../app/model/evaluations"
import { expect } from "chai";
import { mockRunningBack8585, mockRunningBackEvaluation, mockQuaterback, mockWideReceiver, mockTightEnd, mockOL, mockDLAndEdge, mockLinebacker, safetyEvaluation, cornerMock } from "./Evaluation.mock"

describe('Unit EvaluationRunningBack', () => {
  it('Should overall to be 10', () => {
    const evaluation = new RunningBackEvaluation(mockRunningBackEvaluation);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('Should overall to be 8.5475', () => {
    const evaluation = new RunningBackEvaluation(mockRunningBack8585 as RunningBackEvaluation);

    expect(evaluation.getOverall()).to.eql(8.585);
  })
})

describe('Unit EvaluationQuarterback', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new QuarterbackEvaluation(mockQuaterback);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 8.75', () => {
    const evaluation = new QuarterbackEvaluation({
      ...mockQuaterback,
      athleticism: 5,
      armStrength: 8,
      decistionMaking: 8,
      footballIQ: 8
    } as QuarterbackEvaluation);

    expect(evaluation.getOverall()).to.eql(8.75);
  })
})


describe('Unit EvaluationWideReceiver', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new WideReceiverEvaluation(mockWideReceiver);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 8.9475', () => {
    const evaluation = new WideReceiverEvaluation({
      ...mockWideReceiver,
      athleticism: 7.6,
      routeRunning: 8.6,
      hands: 8.5,
      separation: 8.5
    } as WideReceiverEvaluation);

    expect(evaluation.getOverall()).to.eql(8.9475);
  })
})


describe('Unit EvaluationTightEnd', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new TightEndEvaluation(mockTightEnd);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 8.5', () => {
    const evaluation = new TightEndEvaluation({
      ...mockTightEnd,
      athleticism: 7.6,
      routeRunning: 8.6,
      hands: 8.5,
      separation: 8.5,
      passBlocking: 8,
      runBlocking: 5,
      versatility: 8
    } as TightEndEvaluation);

    expect(evaluation.getOverall()).to.eql(8.5);
  })
})


describe('Unit OffensiveLinemen', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new OffensiveLinemenEvaluation(mockOL);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 9.275', () => {
    const evaluation = new OffensiveLinemenEvaluation({
      ...mockOL,
      anchor: 8,
      athleticism: 7,
      powerRun: 9,
      zoneRun: 7.5
    } as OffensiveLinemenEvaluation);

    expect(evaluation.getOverall()).to.eql(9.275);
  })
})

describe('Unit IndsideDL ', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new InsideDefensiveLinemenEvaluation(mockDLAndEdge);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 9.025', () => {
    const evaluation = new InsideDefensiveLinemenEvaluation({
      ...mockDLAndEdge,
      athleticism: 8,
      handUsage: 7.6,
      handPower: 9,
      runDefending: 8
    } as InsideDefensiveLinemenEvaluation);

    expect(evaluation.getOverall()).to.eql(9.025);
  })
})

describe('Unit EdgeRusher ', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new EdgeEvaluation(mockDLAndEdge);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 9.125', () => {
    const evaluation = new EdgeEvaluation({
      ...mockDLAndEdge,
      athleticism: 8,
      handUsage: 7.6,
      handPower: 9,
      runDefending: 8
    } as InsideDefensiveLinemenEvaluation);

    expect(evaluation.getOverall()).to.eql(9.125);
  })
})

describe('Unit Linebacker', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new LinebackerEvaluation(mockLinebacker);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 9.4', () => {
    const evaluation = new LinebackerEvaluation({
      ...mockLinebacker,
      athleticism: 8,
      passRushAbility: 8.5,
      runSupport: 9
    } as LinebackerEvaluation);

    expect(evaluation.getOverall()).to.eql(9.4);
  })
})

describe('Unit SafetyEvaluation', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new SafetyEvaluation(safetyEvaluation);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 8.975', () => {
    const evaluation = new SafetyEvaluation({
      ...safetyEvaluation,
      zoneCoverage: 8,
      manCoverage: 7,
      ballSkills: 9
    } as SafetyEvaluation);

    expect(evaluation.getOverall()).to.eql(8.975);
  })
})


describe('Unit CornerEvaluation', () => {

  it('It should overall to eql 10', () => {
    const evaluation = new CornerbackEvaluation(cornerMock);

    expect(evaluation.getOverall()).to.eql(10);
  })

  it('It should overall to eql 8.8', () => {
    const evaluation = new CornerbackEvaluation({
      ...cornerMock,
      zoneCoverage: 8,
      manCoverage: 7,
      ballSkills: 9
    } as CornerbackEvaluation);

    expect(evaluation.getOverall()).to.eql(8.8);
  })
})