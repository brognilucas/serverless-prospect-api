import {
    CornerbackEvaluation,
    InsideDefensiveLinemenEvaluation,
    LinebackerEvaluation,
    OffensiveLinemenEvaluation,
    QuarterbackEvaluation,
    RunningBackEvaluation,
    SafetyEvaluation,
    TightEndEvaluation,
    WideReceiverEvaluation
} from "../app/model/evaluations/";

export const mockRunningBackEvaluation = {
    athleticism: 10,
    ballSecutity: 10,
    bigPlayHability: 10,
    contactBalance: 10,
    elusiveness: 10,
    explosion: 10,
    footwork: 10,
    versatility: 10,
    vision: 10
} as RunningBackEvaluation

export const mockRunningBack8585 = {
    athleticism: 8.63,
    ballSecutity: 7.5,
    bigPlayHability: 9,
    contactBalance: 9.25,
    elusiveness: 8.23,
    explosion: 8.74,
    footwork: 10,
    versatility: 9,
    vision: 8
} as RunningBackEvaluation

export const mockQuaterback = {
    poise: 10,
    accuracy: 10,
    decistionMaking: 10,
    armStrength: 10,
    progressions: 10,
    footballIQ: 10,
    leadership: 10,
    pocketManipulation: 10,
    throwingMechanics: 10,
    athleticism: 10
} as QuarterbackEvaluation


export const mockWideReceiver = {
    athleticism: 10,
    routeRunning: 10,
    bodyControl: 10,
    hands: 10,
    release: 10,
    separation: 10,
    yardsAfterCatch: 10,
} as WideReceiverEvaluation

export const mockTightEnd = {
    ...mockWideReceiver,
    runBlocking: 10,
    passBlocking: 10,
    versatility: 10
} as TightEndEvaluation


export const mockOL = {
    balance: 10,
    passSet: 10,
    competitiveToughness: 10,
    lateralMobility: 10,
    handsUsage: 10,
    powerRun: 10,
    zoneRun: 10,
    anchor: 10,
} as OffensiveLinemenEvaluation



export const mockDLAndEdge = {
    firstStep: 10,
    flexibility: 10,
    handUsage: 10,
    handPower: 10,
    runDefending: 10,
    motor: 10,
    passRushMoves: 10,
    strenght: 10,
    athleticism: 10
} as InsideDefensiveLinemenEvaluation


export const mockLinebacker = {
    tackling: 10,
    runSupport: 10,
    zoneCoverage: 10,
    manCoverage: 10,
    footballIQ: 10,
    passRushAbility: 10,
    athleticism: 10
} as LinebackerEvaluation

export const safetyEvaluation = {
    footballIQ: 10,
    runSupport: 10,
    tackling: 10,
    zoneCoverage: 10,
    manCoverage: 10,
    ballSkills: 10,
    athleticism: 10
} as SafetyEvaluation


export const cornerMock = {
    manCoverage: 10,
    zoneCoverage: 10,
    ballSkills: 10,
    tackling: 10,
    runDefending: 10,
    flexibility: 10,
    athleticism: 10
} as CornerbackEvaluation