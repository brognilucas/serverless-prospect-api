export interface IEvent {
    body: string; 
    pathParameters: PathParams
}


interface PathParams {
    id: string
}

