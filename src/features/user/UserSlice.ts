import {apiSlice} from "../api/ApiSlice.ts";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {ResponseInterface} from "../../interfaces/response/ResponseInterface.ts";
import {Constants} from "../../common/Constants.ts";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUp: builder.mutation<ResponseInterface, UserInterface>({
            query: arg => ({
                url: "/user/signUp",
                method: Constants.HTTP_METHOD_POST,
                body: arg
            }),
        })
    })
});

export const {
    useSignUpMutation
} = userSlice;