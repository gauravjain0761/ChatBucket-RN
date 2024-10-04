import Toast from "react-native-toast-message";
import { navigationRef } from "../navigation/RootContainer";
import { CommonActions } from "@react-navigation/native";


export const successToast = (message: string) => {
    Toast.show({ type: "success", text1: message });
};

export const errorToast = (message: string) => {
    Toast.show({ type: "error", text1: message });
};

export const emailCheck = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
        return false;
    } else {
        return true;
    }
};

export const nameCheck = (name: string) => {
    let reg = /^([a-zA-Z ]){2,30}$/;
    if (reg.test(name) === false) {
        return false;
    } else {
        return true;
    }
};

export const passwordCheck = (string: string) => {
    let reg = /^(?=.*[0-8])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    return reg.test(string);
};

export const mobileNumberCheck = (mobileNo: string) => {
    let reg = /^\d*$/
    return reg.test(mobileNo);
}

export const resetNavigation = (screenName: any, params: any) => {
    navigationRef.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: screenName,
                    params: params,
                },
            ],
        })
    );
}