import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { createStats, findStatsByProspect, compareProspectsByStats } from "../app/handler";
import * as prospectsMock from "./prospects-stats.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import { prospectStats as ProspectStatsModel } from "../app/model/prospect-stats";
import { ProspectStatsService } from "../app/service/prospectStats";
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

  it("failure - prospect not found", () => {

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
        expect(result.statusCode).to.equal(404);
        expect(body.message).to.equal('Prospect not found')
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - Invalid type", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockDefensiveStats,
          type: 'Some invalid type'
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal('Invalid type')
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - Missing type", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);


    const mock = { ...prospectsMock.mockDefensiveStats }

    delete mock['type']

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...mock
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal('Invalid type')
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - Missing year", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);

    const mock = { ...prospectsMock.mockDefensiveStats }

    delete mock['year']

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.defensiveProspect.id },
        body: JSON.stringify({
          ...mock
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal('Year is required')
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - prospect already has stats for defensive and year", () => {

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
        expect(body.message).to.equal(`Prospect already has ${prospectsMock.mockDefensiveStats.type} stats for ${prospectsMock.mockDefensiveStats.year}`)
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - defensive player - prospect missing tackles", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.defensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);

    const prospectStats = { ...prospectsMock.mockDefensiveStats }

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

    const prospectStats = { ...prospectsMock.mockDefensiveStats }

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

    const prospectStats = { ...prospectsMock.mockDefensiveStats }

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

    const prospectStats = { ...prospectsMock.mockDefensiveStats }

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

  it("success - rushing stats", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);
    prospectStatsModel.expects("create").chain('exec').resolves(prospectsMock.mockRushingStats);

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockRushingStats,
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

  it("success - receiving stats", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);
    prospectStatsModel.expects("create").chain('exec').resolves(prospectsMock.mockReceivingStats);

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockReceivingStats,
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


  it("success - passing stats", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);
    prospectStatsModel.expects("create").chain('exec').resolves(prospectsMock.mockPassingStats);

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockPassingStats,
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


  it("failure - prospect already has stats for passing and year", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(prospectsMock.mockPassingStats);

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectsMock.mockPassingStats,
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(400);
        expect(body.message).to.equal(`Prospect already has ${prospectsMock.mockPassingStats.type} stats for ${prospectsMock.mockPassingStats.year}`)
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });



  it("failure - offensive player - prospect missing yards", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);

    const prospectStats = { ...prospectsMock.mockPassingStats }

    Object.assign(prospectStats.stats, {
      yards: null
    });

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal('Offensive stats must have yards, average, longest and touchdowns')
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });


  it("failure - offensive player - prospect missing average", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);

    const prospectStats = { ...prospectsMock.mockPassingStats }

    Object.assign(prospectStats.stats, {
      average: null
    });

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal('Offensive stats must have yards, average, longest and touchdowns')
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - offensive player - prospect missing longest", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);

    const prospectStats = { ...prospectsMock.mockPassingStats }

    Object.assign(prospectStats.stats, {
      longest: null
    });

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal('Offensive stats must have yards, average, longest and touchdowns')
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("failure - offensive player - prospect missing touchdowns", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect);
    prospectStatsModel.expects("findOne").chain('exec').resolves(null);

    const prospectStats = { ...prospectsMock.mockPassingStats }

    Object.assign(prospectStats.stats, {
      touchdowns: null
    });

    return lambdaTester(createStats)
      .event({
        pathParameters: { id: prospectsMock.offensiveProspect.id },
        body: JSON.stringify({
          ...prospectStats
        }),
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.message).to.equal('Offensive stats must have yards, average, longest and touchdowns')
        expect(result.statusCode).to.equal(400);
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });
});


describe("Get Prospect Stats [GET]", () => {
  it("success", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)


    prospectModel.expects("findOne").chain('exec').resolves(prospectsMock.offensiveProspect)
    prospectStatsModel.expects("find").chain('lean').resolves(prospectsMock.getData.stats);

    return lambdaTester(findStatsByProspect)
      .event({
        pathParameters: { id: prospectsMock.getData.prospect.id }
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.data).to.eql(prospectsMock.getData)
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });

  it("Fail with prospect not found", () => {

    const prospectModel = sinon.mock(ProspectModel)
    const prospectStatsModel = sinon.mock(ProspectStatsModel)

    prospectModel.expects("findOne").chain('exec').resolves(null)

    return lambdaTester(findStatsByProspect)
      .event({
        pathParameters: { id: prospectsMock.getData.prospect.id }
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.code).to.eql(404);
        expect(body.message).to.eql('Prospect not found');
        prospectStatsModel.restore();
        prospectModel.restore();
      });
  });
});

describe('Get Relateds [GET]', () => {

  it("Error - Must inform a type", () => {
    return lambdaTester(compareProspectsByStats)
      .event({
        pathParameters: { id: prospectsMock.getData.prospect.id }
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.code).to.eql(400);
        expect(body.message).to.eql('Must inform which type of stats you want compare');
      });
  });

  it("Success - Must return an object with prospect and relateds", () => {
    const prospectStatsModel = sinon.mock(ProspectStatsModel);

    prospectStatsModel.expects("find").chain('lean').resolves(
      [{
        ...prospectsMock.mockPassingStats, stats: {
          ...prospectsMock.mockPassingStats.stats,
          average: 10,
          touchdowns: 30,
          yards: 850,
          longest: 300
        }
      }]
    );

    const related = {};

    Object.keys(prospectsMock.mockPassingStats.stats).map((key) => {
      related[key] = prospectsMock.mockPassingStats.stats[key] * 0.9 || 0;
    })

    const mockService = sinon.fake.returns([
      { stats: related }
    ]);
    sinon.replace(ProspectStatsService.prototype, "findPossibleRelateds", mockService);


    return lambdaTester(compareProspectsByStats)
      .event({
        pathParameters: { id: prospectsMock.getData.prospect.id },
        queryStringParameters: { statsType: 'defensive' }
      })
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        expect(body.code).to.eql(0);
        expect(body.data).to.have.property('prospect');
        expect(body.data).to.have.property('relateds');
      });
  });
})