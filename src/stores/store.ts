import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import authReducer from "./features/authSlice";
import meReducer from "./features/meSlice";
import devisiReducer from "./features/devisiSlice";
import penempatanReducer from "./features/penempatanSlice";
import userReducer from "./features/userSlice";
import executorReducer from "./features/executorSlice";
import photoReducer from "./features/photoSlice";
import sliderReducer from "./features/sliderSlice";
import ticketReducer from "./features/ticketSlice";
import statusTicketReducer from "./features/statusTicketSlice";
import statusTicket2Reducer from "./features/statusTicket2Slice";
import noteTicketReducer from "./features/noteTicketSlice";
import statusNoteReducer from "./features/statusNoteSlice";
import statusUserReducer from "./features/statusUserSlice";
import typeTicketReducer from "./features/typeTicketSlice";
import privilegeReducer from "./features/privilegeSlice";
import attachmentReducer from "./features/attachmentSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    auth: authReducer,
    me: meReducer,
    devisi: devisiReducer,
    penempatan: penempatanReducer,
    user: userReducer,
    photo: photoReducer,
    slider: sliderReducer,
    ticket: ticketReducer,
    statusTicket:statusTicketReducer,
    statusTicket2:statusTicket2Reducer,
    noteTicket:noteTicketReducer,
    statusNote:statusNoteReducer,
    typeTicket:typeTicketReducer,
    executor:executorReducer,
    statusUser:statusUserReducer,
    privilege:privilegeReducer,
    attachment:attachmentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
