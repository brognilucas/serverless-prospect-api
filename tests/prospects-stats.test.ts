import lambdaTester from "lambda-tester";
import { expect } from "chai";
import {createStats  } from "../app/handler";
import * as prospectsMock from "./prospects-stats.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import { prospectStats as ProspectStatsModel } from "../app/model/prospect-stats";
const sinon = require('sinon'); 
require('sinon-mongoose');



describe("Create Prospect Stats [POST]", () => {
  it("success - defensive player", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);
    prospectStatsModel.expects("create").chain('exec').resolves(prospectsMock.mockDefensiveStats); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.eql('success')
        expect(result.statusCode).to.equal(200);
        expect(body.data).to.have.property('stats');
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - defensive player - prospect not found", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(null);

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal('Prospect not Found')
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - defensive player - prospect not found", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(prospectsMock.mockDefensiveStats); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal(`Prospect already has stats for ${prospectsMock.mockDefensiveStats.year}`)
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - defensive player - prospect missing tackles", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null); 

    const prospectStats = {...prospectsMock.mockDefensiveStats }

    Object.assign(prospectStats.stats, {
      tackles: null
    }); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal(`Defensive stats must have tackles, interceptions, sacks and fumbles`)
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });


  it("failure - defensive player - prospect missing interceptions", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null); 

    const prospectStats = {...prospectsMock.mockDefensiveStats }

    Object.assign(prospectStats.stats, {
      interceptions: null
    }); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal(`Defensive stats must have tackles, interceptions, sacks and fumbles`)
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });


  it("failure - defensive player - prospect missing forcedFumbles", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null); 

    const prospectStats = {...prospectsMock.mockDefensiveStats }

    Object.assign(prospectStats.stats, {
      forcedFumbles: null
    }); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal(`Defensive stats must have tackles, interceptions, sacks and fumbles`)
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - defensive player - prospect missing sacks", () => {
   
    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null); 

    const prospectStats = {...prospectsMock.mockDefensiveStats }

    Object.assign(prospectStats.stats, {
      sacks: null
    }); 

    return lambdaTester(createStats)
      .event({
       pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal(`Defensive stats must have tackles, interceptions, sacks and fumbles`)
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });


});
