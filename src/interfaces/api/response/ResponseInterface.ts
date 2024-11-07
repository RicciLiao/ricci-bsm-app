export interface ResponseInterface<T extends ResponseDataInterface> {
    code: number,
    message: string | null;
    data: T,
}


export interface ResponseDataInterface {
}

export interface ResponseEmptyDataInterface extends ResponseDataInterface {
}

export interface BooleanResult extends ResponseDataInterface {
    result: boolean,
}

export interface ResponseErrorInterface extends ResponseDataInterface {
    status: any,
    date: number
}
