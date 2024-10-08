import { IS_LOADING, SET_OTP_TOKEN, SET_SELETED_MESSAGE, SET_USER_INFO, SHOW_CHATINPUT_ADD_MODAL, SHOW_EMOJI_MODAL } from '../actionTypes';

const initialState = {
  isLoading: false,
  user: undefined,
  otpToken: undefined,
  showChatInputAddModal: false,
  selectedMessage: undefined,
  showEmojiModal: false
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
    case SHOW_CHATINPUT_ADD_MODAL: {
      return { ...state, showChatInputAddModal: action.payload };
    }
    case SET_SELETED_MESSAGE: {
      return { ...state, selectedMessage: action.payload, showEmojiModal: false };
    }
    case SHOW_EMOJI_MODAL: {
      return { ...state, showEmojiModal: action.payload };
    }
    // case USER_LOGOUT: {
    //   return initialState;
    // }
    default:
      return state;
  }
}
