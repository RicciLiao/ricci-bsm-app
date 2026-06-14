interface BsmEntry {
    id?: number;
    entryType: number;
    statusId: number;
    createdBy: number;
    createdDtm?: number;
    updatedBy: number;
    updatedDtm?: number;
    version?: number;
    path: BsmEntryPath;
    fsp?: BsmEntryFsp;
    parentPathList: BsmEntryPath[];
}

interface BsmEntryPath {
    entryId?: number;
    parentEntryId: number;
    entryName: string;
    createdBy: number;
    createdDtm?: number;
    updatedBy: number;
    updatedDtm?: number;
    version?: number;
}

interface BsmEntryFsp {
    entryId: number;
    fspToken: string;
}

export {
    type BsmEntry,
    type BsmEntryPath,
    type BsmEntryFsp,
}