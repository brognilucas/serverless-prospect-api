export interface IEvent {
  body: string;
  pathParameters: PathParams;
  queryStringParameters: QueryParams;
  requestContext: {
    authorizer: {
      principalId: string;
    };
  };
}

interface QueryParams {
  statsType?: string;
}

interface PathParams {
  id: string;
}
