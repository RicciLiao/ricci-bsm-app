interface MessageCodeInterface {
    id: number;
    code: number;
    type: string;
    projectCode: string;
    description: string;
    active: boolean;
    createdBy: number;
    createdDtm: number;
    updatedBy: number;
    updatedDtm: number;
    version: number;
}

export {type MessageCodeInterface};