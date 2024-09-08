import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  privilege?: string;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    "MENU",
    {
      icon: "Home",
      title: "Dashboard",
      pathname: "/",
      privilege: "dashboard"
    },
    {
      icon: "Ticket",
      pathname: "/ticket/data",
      title: "Ticket",
      privilege: "ticket_requestor",
    },
    {
      icon: "Ticket",
      pathname: "/ticket/pic",
      title: "Ticket For PIC",
      privilege: "ticket_executor",
    },
    {
      icon: "Ticket",
      pathname: "/ticket/admin/data",
      title: "Data Ticket",
      privilege: "admin",
    },
    {
      icon: "User",
      pathname: "/user/data",
      title: "User",
      privilege: "admin",
    },
    {
      icon: "Flower",
      pathname: "/slider/data",
      title: "Slider",
      privilege: "admin",
    },
    {
      icon: "Bookmark",
      title: "Entity",
      privilege: "entity",
      subMenu:[
        {
          icon: "Bookmark",
          pathname: "/devisi/data",
          title: "Devisi",
        },
        {
          icon: "Bookmark",
          pathname: "/penempatan/data",
          title: "Penempatan",
        },
        {
          icon: "Bookmark",
          pathname: "/statusNote/data",
          title: "Status Note",
        },
        {
          icon: "Bookmark",
          pathname: "/statusUser/data",
          title: "Status User",
        },
        {
          icon: "Bookmark",
          pathname: "/typeTicket/data",
          title: "Type Ticket",
        }
      ]
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
