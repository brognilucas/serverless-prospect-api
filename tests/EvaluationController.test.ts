import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { removeProspectEvaluation, updateProspectEvaluation } from "../app/handler";
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

  it("User should not be allowed to inform an overall directly", () => {
    return lambdaTester(updateProspectEvaluation)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        requestContext: {
          authorizer: {
            principalId: 'TEST'
          }
        },
        body: JSON.stringify({
          overall: 8.5,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(400);
      });
  })

  it("User be able to edit an evaluation", () => {

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
    prospectEvaluationModel.expects("findOne").chain('exec').resolves({
      user: 'TEST', prospect: 'randomstring', evaluation: {
        tackling: 8,
        runSupport: 8,
        zoneCoverage: 9,
        manCoverage: 9,
        footballIQ: 10,
        passRushAbility: 9,
        athleticism: 8
      }
    });

    prospectEvaluationModel.expects("findOneAndUpdate").chain('exec').resolves({
      user: 'TEST', prospect: 'randomstring', evaluation: {
        tackling: 8,
        runSupport: 8,
        zoneCoverage: 9,
        manCoverage: 9,
        footballIQ: 10,
        passRushAbility: 9,
        athleticism: 8,

      }
    })

    return lambdaTester(updateProspectEvaluation)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        requestContext: {
          authorizer: {
            principalId: 'TEST'
          }
        },
        body: JSON.stringify({
          manCoverage: 8.3,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.data).to.haveOwnProperty('overall');
        expect(body.data).to.haveOwnProperty('manCoverage');
        expect(body.data.manCoverage).to.eql(8.3);
        prospectEvaluationModel.restore();
        prospectModel.restore();
      });
  })

  afterEach(() => {
    prospectEvaluationModel.restore();
    prospectModel.restore();
  })
})