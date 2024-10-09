import { io } from 'socket.io-client';
import { getAsyncToken, getAsyncUserInfo } from '../utils/asyncStorage';


let socket = null;
export { socket };

export const sendData = (event: any, data?: any) => {
    if (data) {
        socket.emit(event, data, (res: any) => {
            console.log(res)
        });
    } else {
        socket.emit(event, (res: any) => {
            console.log(res)
        });
    }

};

export const socketConnect = async (dispatch, next) => {
    console.log('called')
    if (socket !== null) {
        socket.disconnect();
        console.log('dis---')
    }
    console.log("Making socket connection request..");
    let token = await getAsyncToken()
    socket = io(`http://161.35.37.230:4000/?token=${token?.split(' ')[1]}`);
    socket.on("connect", () => {
        console.log("-----------socket connected-----------");
        next(socket.connected);
    });
    socket.on("disconnect", () => {
        console.log("-----------socket disconnect-----------");
    });

    socket.on("RECEIVE_CHAT_HISTORY", (res) => {
        console.log("RECEIVE_CHAT_HISTORY: ", res);
    });

    socket.on("CHAT_LIST", (res) => {
        console.log("CHAT_LIST: ", res);
    });

    socket.on("RECEIVE_CHAT_MESSAGE", (res) => {
        console.log("RECEIVE_CHAT_MESSAGE: ", res);
    });

    socket.on("RECEIVE_OWN_MESSAGE", (res) => {
        console.log("RECEIVE_OWN_MESSAGE: ", res);
    });

    socket.on("RECEIVE_EDITED_MESSAGE", (res) => {
        console.log("RECEIVE_EDITED_MESSAGE: ", res);
    });

    socket.on("RECEIVE_OWN_EDITED_MESSAGE", (res) => {
        console.log("RECEIVE_OWN_EDITED_MESSAGE: ", res);
    });

    socket.on("DELETED_MESSAGE", (res) => {
        console.log("DELETED_MESSAGE: ", res);
    });

};

export const Emit_Event = {
    CHATS_HISTORY_LIST: "CHATS_HISTORY_LIST",
    CHATS_LISTS: "CHATS_LISTS"
}