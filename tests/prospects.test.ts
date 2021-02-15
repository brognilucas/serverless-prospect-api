import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { findOne, find, create, update, deleteOne } from "../app/handler";
import * as prospectsMock from "./prospects.mock";
import { prospect as ProspectModel } from "../app/model/prospects";
import sinon from "sinon";

describe("FindOne [GET]", () => {
  it("success", () => {
    try {
      const s = sinon.mock(ProspectModel);

      s.expects("findOne").atLeast(1).atMost(3).resolves(prospectsMock.findOne);

      return lambdaTester(findOne)
        .event({ pathParameters: { id: prospectsMock.findOne.id } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(200);
          const body = JSON.parse(result.body);
          expect(body.code).to.equal(0);
          s.verify();
          s.restore();
        });
    } catch (err) {
      console.log(err);
    }
  });
});

describe("Find [GET]", () => {
  it("success", () => {
    const s = sinon.mock(ProspectModel);

    s.expects("find").resolves(prospectsMock.find);

    return lambdaTester(find)
      .event({})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});

describe("Create [POST]", () => {
  it("success", () => {
    const s = sinon.mock(ProspectModel);

    s.expects("create").resolves(prospectsMock.create);

    return lambdaTester(create)
      .event({
        body: JSON.stringify({
          ...prospectsMock.findOne,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});

describe("Update [PUT]", () => {
  it("success", () => {
    const s = sinon.mock(ProspectModel);

    s.expects("findOneAndUpdate").resolves(prospectsMock.update);

    return lambdaTester(update)
      .event({
        pathParameters: { id: prospectsMock.findOne.id },
        body: JSON.stringify({
          ...prospectsMock.findOne,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});

describe("DeleteOne [Delete]", () => {
  it("success", () => {
    const s = sinon.mock(ProspectModel);

    s.expects("deleteOne").resolves(prospectsMock.deleteOne);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: prospectsMock.findOne.id } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it("deletedCount === 0", () => {
    const s = sinon.mock(ProspectModel);

    s.expects("deleteOne").resolves(prospectsMock.deletedCount);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: "some aleatory string" } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(404);
        s.restore();
      });
  });
});
