import {bsmConstants} from "@common/bsmConstants.ts";
import {BsmEntry, BsmEntryPath} from "@interfaces/api/BsmEntry.ts";
import {FspContent} from "@interfaces/api/FspContent.ts";
import {apiSlice, Blank, Collection, XResponse} from "x-common-components-app";

const bsmEntrySlice = apiSlice
    .enhanceEndpoints({addTagTypes: ["Entry"]})
    .injectEndpoints({
        endpoints: builder => ({
            createEntry: builder.mutation<XResponse<Blank>, BsmEntry>({
                query: arg => ({
                    url: "/bsm/entry",
                    method: bsmConstants.HTTP_METHOD_POST,
                    body: arg
                }),
                invalidatesTags: ['Entry'],
            }),
            listByParentEntryId: builder.query<XResponse<Collection<BsmEntry>>, number>({
                query: arg => ({
                    url: `/bsm/entry/listByParentEntryId?parentEntryId=${arg}`,
                    method: bsmConstants.HTTP_METHOD_GET,
                }),
                providesTags: ["Entry"],
            }),
            getEntryParentPath: builder.query<XResponse<Collection<BsmEntryPath>>, number>({
                query: arg => ({
                    url: `/bsm/entry/getParentPath/${arg}`,
                    method: bsmConstants.HTTP_METHOD_GET,
                }),
            }),
            getFsp: builder.query<XResponse<FspContent>, string>({
                query: arg => ({
                    url: `/bsm/entry/fsp?token=${arg}`,
                    method: bsmConstants.HTTP_METHOD_GET,
                }),
            }),
        })
    })

export const {
    useListByParentEntryIdQuery,
    useLazyListByParentEntryIdQuery,
    useLazyGetEntryParentPathQuery,
    useLazyGetFspQuery,
    useCreateEntryMutation,
} = bsmEntrySlice;

export {bsmEntrySlice};