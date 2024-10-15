import { io } from "socket.io-client";
import { getAsyncToken, getAsyncUserInfo } from "../utils/asyncStorage";
import { dispatchAction } from "../redux/hooks";
import {
  ADD_ONE_MESSAGE,
  SET_CHAT_HISTORY,
  SET_MESSAGES,
  UPDATE_DELETE_MESSAGE,
  UPDATE_EDITED_MESSAGE,
} from "../redux/actionTypes";
import { errorToast } from "../utils/commonFunction";
import { Platform } from "react-native";

let socket = null;
export { socket };

export const sendData = (event: any, data?: any) => {
  if (data) {
    socket?.emit(event, data, (res: any) => {
      console.log(res);
    });
  } else {
    socket?.emit(event, (res: any) => {
      console.log(res);
    });
  }
};

export const socketConnect = async (dispatch, next) => {
  if (socket !== null) {
    socket.disconnect();
    console.log("dis---");
  }
  console.log("Making socket connection request..");
  let token = await getAsyncToken();
  console.log(token);
  socket = io(`http://161.35.37.230:4000?token=${token?.split(" ")[1]}`);
  socket.on("connect", () => {
    console.log("-----------socket connected-----------");
    next(socket.connected);
  });
  socket.on("disconnect", () => {
    console.log("-----------socket disconnect-----------");
  });
  socket.on("ERROR_RECEIVER", (res) => {
    console.log("ERROR_RECEIVER:--- ", Platform.OS, res);
    errorToast(res?.message);
  });

  socket.on("RECEIVE_CHAT_HISTORY", (res) => {
    console.log("RECEIVE_CHAT_HISTORY:--- ", Platform.OS, res);
    dispatchAction(dispatch, SET_CHAT_HISTORY, res);
  });

  socket.on("CHAT_LIST", (res) => {
    console.log("CHAT_LIST:--- ", Platform.OS, res);
    dispatchAction(dispatch, SET_MESSAGES, res);
  });

  socket.on("RECEIVE_CHAT_MESSAGE", (res) => {
    console.log("RECEIVE_CHAT_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, ADD_ONE_MESSAGE, res);
  });

  socket.on("RECEIVE_OWN_MESSAGE", (res) => {
    console.log("RECEIVE_OWN_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, ADD_ONE_MESSAGE, res);
  });

  socket.on("RECEIVE_EDITED_MESSAGE", (res) => {
    console.log("RECEIVE_EDITED_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, UPDATE_EDITED_MESSAGE, res);
  });

  socket.on("READED_MESSAGE", (res) => {
    console.log("READED_MESSAGE:--- ", Platform.OS, res);
  });

  socket.on("DELETED_MESSAGE", (res) => {
    console.log("DELETED_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, UPDATE_DELETE_MESSAGE, res);
  });

  socket.on("DELETE_OWN_MESSAGE", (res) => {
    console.log("DELETE_OWN_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, UPDATE_DELETE_MESSAGE, res);
  });

  socket.on("RECEIVE_OWN_EDITED_MESSAGE", (res) => {
    console.log("RECEIVE_OWN_EDITED_MESSAGE:--- ", Platform.OS, res);
    dispatchAction(dispatch, UPDATE_EDITED_MESSAGE, res);
  });
};

export const Emit_Event = {
  CHATS_HISTORY_LIST: "CHATS_HISTORY_LIST",
  CHATS_LIST: "CHATS_LIST",
  READ_MESSAGE: "READ_MESSAGE",
  SEND_MESSAGE: "SEND_MESSAGE",
  SEND_EDITED_MESSAGE: "SEND_EDITED_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
};
