interface MessageCode {
    id: number;
    code: string;
    level: string;
    consumer: string;
    description: string;
    active: boolean;
    createdBy: number;
    createdDtm: number;
    updatedBy: number;
    updatedDtm: number;
    version: number;
}

export {type MessageCode};