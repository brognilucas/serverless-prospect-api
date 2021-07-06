import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { removeProspectEvaluation } from "../app/handler";
import * as prospectsMock from "./prospects-stats.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import { prospectEvaluationModel as ProspectEvaluationModel } from "../app/model";
const sinon = require('sinon');
require('sinon-mongoose');

describe("Create Prospect Stats [POST]", () => {
  let prospectModel = sinon.mock(ProspectModel)
  let prospectEvaluationModel = sinon.mock(ProspectEvaluationModel)


  beforeEach(() => {
    prospectEvaluationModel.restore();
    prospectModel.restore();

    prospectModel = sinon.mock(ProspectModel)
    prospectEvaluationModel = sinon.mock(ProspectEvaluationModel)

  })

  it("success - remove evaluation", () => {

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
    prospectEvaluationModel.expects("deleteOne").chain('exec').resolves({});

    return lambdaTester(removeProspectEvaluation)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        requestContext: {
          authorizer: {
            principalId: 'TEST'
          }
        },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(204);
        prospectEvaluationModel.restore();
        prospectModel.restore();
      });
  })


  it("error - remove evaluation not", () => {

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
    prospectEvaluationModel.expects("deleteOne").chain('exec').throws()

    return lambdaTester(removeProspectEvaluation)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        requestContext: {
          authorizer: {
            principalId: 'TEST'
          }
        },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(400);
        prospectEvaluationModel.restore();
        prospectModel.restore();
      });
  })

  afterEach(() => {
    prospectEvaluationModel.restore();
    prospectModel.restore();
  })
})