import Toast from "react-native-toast-message";
import { navigationRef } from "../navigation/RootContainer";
import { CommonActions } from "@react-navigation/native";
import { API } from "./apiConstant";
import moment from "moment";

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
  let reg = /^\d*$/;
  return reg.test(mobileNo);
};

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
};

export const dayPipe = (date: any, flag?: any) => {
  var DATE = moment(date);
  var REFERENCE = moment();
  var TODAY = REFERENCE.clone().startOf("day");
  var YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

  if (flag === "time") {
    // If you want only time from date object
    return DATE.format(API.FORMAT_TIME);
  } else if (flag === "date") {
    // If you want only date from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return DATE.format(API.FORMAT_TIME);
      else if (DATE.isSame(YESTERDAY, "d")) return "Yesterday";
      else return DATE.format("dddd");
    } else return DATE.format(API.FORMAT_DATE);
  } else {
    // If you want only date and time both from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return `${DATE.format(API.FORMAT_TIME)}`;
      else if (DATE.isSame(YESTERDAY, "d"))
        return `Yesterday ${DATE.format(API.FORMAT_TIME)}`;
      else return DATE.format(API.FORMAT_DAY_TIME);
    } else return DATE.format(API.FORMAT_DATE_TIME);
  }
};
