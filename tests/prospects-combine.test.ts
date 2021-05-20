import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { findCombineData, createProspectCombineInfo, findCombineDataByProspect, updateCombineData, deleteCombineData } from "../app/handler";
import * as prospectsMock from "./prospects-stats.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import { prospectCombine as ProspectCombine } from "../app/model";
import { combineMock } from "./prospect-combine.mock";

const sinon = require('sinon');
require('sinon-mongoose');


describe("Create Prospect Combine [POST]", () => {
  const prospectModel = sinon.mock(ProspectModel)
  const prospectStatsModel = sinon.mock(ProspectCombine)

  it("success", () => {
    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("create").resolves(combineMock);

    return lambdaTester(createProspectCombineInfo)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...combineMock,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.eql('success')
        expect(result.statusCode).to.equal(200);
        expect(body.data).to.have.property('fortyYardsDash');
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - prospect not found", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectCombine)

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(null);
    prospectStatsModel.expects("create").resolves(combineMock);

    return lambdaTester(createProspectCombineInfo)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...combineMock,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.eql('Prospect not found')
        expect(result.statusCode).to.equal(404);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });


  after(() => {
    prospectStatsModel.restore();
    prospectModel.restore();
  })
});

describe("Get Prospect Combine Data [GET]", () => {

  const prospectModel = sinon.mock(ProspectModel)
  const prospectCombine = sinon.mock(ProspectCombine)

  beforeEach(() => {
    prospectModel.restore();
    prospectCombine.restore();
  })

  it("success", () => {
    prospectCombine.expects("find").resolves([combineMock]);

    return lambdaTester(findCombineData)
      .event({
        queryStringParameters: {},
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.eql('success')
        expect(result.statusCode).to.equal(200);
        expect(body.data[0]).to.have.property('fortyYardsDash');
        prospectCombine.restore();
        prospectModel.restore();
      });
  });

  it("failure - prospect not found", () => {
    prospectModel.expects("findOne").chain('exec').resolves(null);

    return lambdaTester(findCombineDataByProspect)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.eql('Prospect not found')
        expect(result.statusCode).to.equal(404);
        prospectCombine.restore();
        prospectModel.restore();
      });
  });

  it("failure - data combine not found to prospect", () => {

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectCombine.expects("findOne").resolves(null);

    return lambdaTester(findCombineDataByProspect)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(404);
        prospectCombine.restore();
        prospectModel.restore();
      });
  });


  after(() => {
    prospectCombine.restore();
    prospectModel.restore();
  })

});

describe("Update Prospect Combine [PUT]", () => {
  const prospectModel = sinon.mock(ProspectModel)
  const prospectCombine = sinon.mock(ProspectCombine)

  beforeEach(() => {
    prospectModel.restore();
    prospectCombine.restore();
  })

  it("success", () => {
    const combineEdited = { ...combineMock, fortyYardsDash: 4.67 }

    prospectCombine.expects("findOne").resolves(combineMock);
    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectModel.expects("findOneAndUpdate").chain('exec').resolves(combineEdited);

    return lambdaTester(updateCombineData)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...combineEdited,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(204);
        prospectCombine.restore();
        prospectModel.restore();
      });
  });

  after(() => {
    prospectCombine.restore();
    prospectModel.restore();
  })
})


describe("Delete Prospect Combine [PUT]", () => {
  const prospectModel = sinon.mock(ProspectModel)
  const prospectCombine = sinon.mock(ProspectCombine)

  beforeEach(() => {
    prospectModel.restore();
    prospectCombine.restore();
  })

  it("success", () => {
    prospectModel.expects("deleteOne").chain('exec').resolves(prospectsMock.defensiveProspect);

    return lambdaTester(deleteCombineData)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(204);
        prospectCombine.restore();
        prospectModel.restore();
      });
  });

  after(() => {
    prospectCombine.restore();
    prospectModel.restore();
  })
})