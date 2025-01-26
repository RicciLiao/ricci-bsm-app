interface Response<T extends ResponseDataInterface> {
    code: number,
    message: string | null;
    data: T,
}


interface ResponseDataInterface {
}

interface ResponseEmptyDataInterface extends ResponseDataInterface {
}

interface BooleanResult extends ResponseDataInterface {
    result: boolean,
}

interface ResponseStatusInterface extends ResponseDataInterface {
    status: any,
    date: number,
}

export {
    type Response,
    type ResponseDataInterface,
    type ResponseEmptyDataInterface,
    type BooleanResult,
    type ResponseStatusInterface
}
