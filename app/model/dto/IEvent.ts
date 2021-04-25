export interface IEvent {
    body: string;
    pathParameters: PathParams
    queryStringParameters: QueryParams
}


interface QueryParams {
    statsType?: string
}

interface PathParams {
    id: string
}

