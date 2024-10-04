import { ThunkAction } from "redux-thunk";
import { dispatchAction, RootState } from "../redux/hooks";
import { AnyAction } from "redux";
import { IS_LOADING, SET_OTP_TOKEN, SET_USER_INFO } from "../redux/actionTypes";
import { handleErrorRes, handleSuccessRes, makeAPIRequest, setAuthorization } from "../utils/apiGlobal";
import { API, POST } from "../utils/apiConstant";
import { setAsyncToken, setAsyncUserInfo } from "../utils/asyncStorage";
import { successToast } from "../utils/commonFunction";

interface requestProps {
    data?: any;
    params?: any;
    onSuccess?: (res: any) => void;
    onFailure?: (res: any) => void;
}

export const onUserLogin = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.login, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {
                    setAuthorization(response?.data?.data?.authToken)
                    await setAsyncToken(response?.data?.data?.authToken)
                    setAsyncUserInfo(response?.data?.data?.user)
                    dispatchAction(dispatch, SET_USER_INFO, response?.data?.data?.user)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };


export const onRegister = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.register, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {
                    dispatchAction(dispatch, SET_USER_INFO, data)
                    successToast(response?.data?.message + ' ' + response?.data?.data)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };


export const onVerifyOtp = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.verifyOtp, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {
                    successToast(response?.data?.message)
                    dispatchAction(dispatch, SET_OTP_TOKEN, response?.data?.data?.otpToken)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };

export const onVerifyUsername = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        // dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.verifyUsername, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {

                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };

export const onSetupProfile = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.setupProfile, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {
                    setAuthorization(response?.data?.data?.authToken)
                    await setAsyncToken(response?.data?.data?.authToken)
                    setAsyncUserInfo(response?.data?.data?.user)
                    dispatchAction(dispatch, SET_USER_INFO, response?.data?.data?.user)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };

export const onForgetPassword = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.forgetPassword, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {
                    dispatchAction(dispatch, SET_USER_INFO, data)
                    successToast(response?.data?.message + ' ' + response?.data?.data)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };


export const onResetPassword = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.resetPassword, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, async () => {

                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };