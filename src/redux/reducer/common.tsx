import {
  ACTIVE_CHAT,
  ADD_ONE_MESSAGE,
  DELETE_MESSAGE_MODAL_VISIBLE,
  IS_LOADING,
  SET_CHAT_HISTORY,
  SET_CONTACT_LIST,
  SET_EDIT_MESSAGE,
  SET_MESSAGES,
  SET_OTP_TOKEN,
  SET_SELETED_MESSAGE,
  SET_USER_INFO,
  SHOW_CHATINPUT_ADD_MODAL,
  SHOW_EMOJI_MODAL,
  UPDATE_DELETE_MESSAGE,
  UPDATE_EDITED_MESSAGE,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  user: undefined,
  otpToken: undefined,
  showChatInputAddModal: false,
  selectedMessage: undefined,
  showEmojiModal: false,
  chatHistory: undefined,
  messageList: [],
  activeChat: undefined,
  editMessage: undefined,
  deleteMsgModal: false,
  contactList: false,
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
      return {
        ...state,
        selectedMessage: action.payload,
        showEmojiModal: false,
        editMessage: undefined,
        deleteMsgModal: undefined,
      };
    }
    case SHOW_EMOJI_MODAL: {
      return { ...state, showEmojiModal: action.payload };
    }
    case SET_CHAT_HISTORY: {
      return { ...state, chatHistory: action.payload };
    }
    case SET_MESSAGES: {
      return { ...state, messageList: action.payload };
    }
    case ACTIVE_CHAT: {
      return { ...state, activeChat: action.payload };
    }
    case ADD_ONE_MESSAGE: {
      let updatedMessageList = Object.assign([], state.messageList);
      updatedMessageList.unshift(action.payload);
      return { ...state, messageList: updatedMessageList };
    }
    case SET_EDIT_MESSAGE: {
      return { ...state, editMessage: action.payload };
    }
    case UPDATE_EDITED_MESSAGE: {
      let updatedMessageList = Object.assign([], state.messageList);
      updatedMessageList = updatedMessageList.map((data) => {
        if (data._id === action.payload._id) data = action.payload;
        return data;
      });
      return { ...state, messageList: updatedMessageList };
    }
    case UPDATE_DELETE_MESSAGE: {
      let updatedMessageList = Object.assign([], state.messageList);
      updatedMessageList = updatedMessageList.filter(
        (obj) => obj?._id !== action.payload.chatId
      );
      return { ...state, messageList: updatedMessageList };
    }
    case DELETE_MESSAGE_MODAL_VISIBLE: {
      return { ...state, deleteMsgModal: action.payload };
    }
    case SET_CONTACT_LIST: {
      return { ...state, contactList: action.payload };
    }
    // case USER_LOGOUT: {
    //   return initialState;
    // }
    default:
      return state;
  }
}
