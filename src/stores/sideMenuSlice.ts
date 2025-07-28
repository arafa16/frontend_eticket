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
      title: "Ticket",
      privilege: "ticket",
      subMenu:[
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
      ]
    },
    {
      icon: "Ticket",
      title: "Project",
      privilege: "project",
      subMenu:[
        {
          icon: "Ticket",
          pathname: "/project/admin/data",
          title: "Data Project",
          privilege: "project_administrator",
        },
        {
          icon: "Ticket",
          pathname: "/project/pic/data",
          title: "Project By PIC",
          privilege: "project_executor",
        }
      ]
    },
    {
      icon: "Car",
      title: "Car Reservation",
      privilege: "car_reservation",
      subMenu:[
        {
          icon: "Car",
          pathname: "/carReservation/data",
          title: "Car Reservation",
          privilege: "car_reservation_user",
        },
        {
          icon: "Car",
          pathname: "/carReservation/driver/data",
          title: "Car Reservation Driver",
          privilege: "car_reservation_driver",
        },
        {
          icon: "Car",
          pathname: "/carReservation/admin/data",
          title: "Car Reservation Admin",
          privilege: "car_reservation_admin",
        },
      ]
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
          privilege: "entity",
        },
        {
          icon: "Bookmark",
          pathname: "/penempatan/data",
          title: "Penempatan",
          privilege: "entity",
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
          privilege: "entity",
        },
        {
          icon: "Bookmark",
          pathname: "/typeTicket/data",
          title: "Type Ticket",
          privilege: "entity",
        },
        {
          icon: "Bookmark",
          pathname: "/projectType/data",
          title: "Project Type",
          privilege: "entity",
        },
        {
          icon: "Bookmark",
          pathname: "/projectStatus/data",
          title: "Project Status",
          privilege: "entity",
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
