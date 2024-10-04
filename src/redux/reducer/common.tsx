import { IS_LOADING, SET_OTP_TOKEN, SET_USER_INFO } from '../actionTypes';

const initialState = {
  isLoading: false,
  user: undefined,
  otpToken: undefined
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case SET_OTP_TOKEN: {
      return { ...state, otpToken: action.payload };
    }
    case SET_USER_INFO: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}
