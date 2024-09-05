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
    },
    {
      icon: "Ticket",
      pathname: "/ticket/data",
      title: "Ticket",
    },
    {
      icon: "Ticket",
      pathname: "/ticket/pic",
      title: "Ticket For PIC",
    },
    {
      icon: "Ticket",
      pathname: "/ticket/admin/data",
      title: "Data Ticket",
    },
    {
      icon: "User",
      pathname: "/user/data",
      title: "User",
    },
    {
      icon: "Flower",
      pathname: "/slider/data",
      title: "Slider",
    },
    "Asset",
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
      icon: "Trello",
      pathname: "/profile",
      title: "Profile",
    }
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
