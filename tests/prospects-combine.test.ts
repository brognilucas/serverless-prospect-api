import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { findCombineData, compareProspectCombineInfo } from "../app/handler";
import * as prospectsMock from "./prospects-stats.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import { prospectCombine as ProspectCombine } from "../app/model";
import { combineMock } from "./prospect-combine.mock";

const sinon = require('sinon');
require('sinon-mongoose');


describe("Create Prospect Combine [POST]", () => {
    it("success", () => {

        const prospectModel = sinon.mock(ProspectModel)
        const prospectStatsModel = sinon.mock(ProspectCombine)

        prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
        prospectStatsModel.expects("create").resolves(combineMock);

        return lambdaTester(compareProspectCombineInfo)
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

        return lambdaTester(compareProspectCombineInfo)
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
});

describe("Get Prospect Combine Data [GET]", () => {
    it("success", () => {

        const prospectModel = sinon.mock(ProspectModel)
        const prospectStatsModel = sinon.mock(ProspectCombine)

        prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
        prospectStatsModel.expects("findOne").resolves(combineMock);

        return lambdaTester(findCombineData)
            .event({
                pathParameters: { id: prospectsMock.defensiveProspect.id },
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
        return lambdaTester(findCombineData)
            .event({
                pathParameters: { id: prospectsMock.defensiveProspect.id },
            })
            .expectResult((result: any) => {
                const body = JSON.parse(result.body);
                expect(body.message).to.eql('Prospect not found')
                expect(result.statusCode).to.equal(404);
                prospectStatsModel.restore();
                prospectModel.restore();
            });
    });

    it("failure - data combine not found to prospect", () => {

        const prospectModel = sinon.mock(ProspectModel)
        const prospectStatsModel = sinon.mock(ProspectCombine)

        prospectModel.expects("findOne").chain('exec').atLeast(1).atMost(1).resolves(prospectsMock.defensiveProspect);
        return lambdaTester(findCombineData)
            .event({
                pathParameters: { id: prospectsMock.defensiveProspect.id },
            })
            .expectResult((result: any) => {
                const body = JSON.parse(result.body);
                expect(body.message).to.eql(`Combine data not found to ${prospectsMock.defensiveProspect.name}`)
                expect(result.statusCode).to.equal(404);
                prospectStatsModel.restore();
                prospectModel.restore();
            });
    });

});