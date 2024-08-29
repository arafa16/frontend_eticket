import { useRoutes } from "react-router-dom";
import Menu from "../layouts/SideMenu";
import Login from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Register from "../pages/auth/register";
import EmailReset from "../pages/auth/emailReset";
import UserDashboard from "../pages/Dashboard/userDashboard.js";
import Show from "../pages/showPage/show.js";
import ViewTicketPage from "../pages/ticket/viewTicketPage";
import DataTicketUserPage from "../pages/ticket/dataTicketUserPage";
import CreateTicketPage from "../pages/ticket/createTicketPage";
import DataTicketPicPage from "../pages/ticketForPic/dataTicketPicPage";
import ViewTicketPicPage from "../pages/ticketForPic/viewTicketPicPage";
import DataTicketPage from "../pages/ticketAll/dataTicketPage";
import CreateTicketAdminPage from "../pages/ticketAll/createTicketAdminPage";
import ViewTicketAdminPage from "../pages/ticketAll/viewTicketAdminPage";
import UpdateTicketAdminPage from "../pages/ticketAll/updateTicketAdminPage";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Menu />,
      children: [
        {
          path: "/",
          element: <UserDashboard />,
        },
        {
          path: "/ticket/data",
          element: <DataTicketUserPage />,
        },
        {
          path: "/ticket/create",
          element: <CreateTicketPage />,
        },
        {
          path: "/ticket/data/:id",
          element: <ViewTicketPage />,
        },
        {
          path: "/ticket/pic",
          element: <DataTicketPicPage />,
        },
        {
          path: "/ticket/pic/:id",
          element: <ViewTicketPicPage />,
        },
        {
          path: "/ticket/admin/data",
          element: <DataTicketPage />,
        },
        {
          path: "/ticket/admin/create",
          element: <CreateTicketAdminPage />,
        },
        {
          path: "/ticket/admin/data/:id",
          element: <ViewTicketAdminPage />,
        },
        {
          path: "/ticket/admin/edit/:id",
          element: <UpdateTicketAdminPage />,
        },
        {
          path: "/show",
          element: <Show />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotPassword",
      element: <EmailReset />,
    },
    {
      path: "/reset/:token",
      element: <ResetPassword />,
    },
    // {
    //   path: "/error",
    //   element: <ErrorPage />,
    // },
  ];

  return useRoutes(routes);
}

export default Router;
