import { useRoutes } from "react-router-dom";
import Menu from "../layouts/SideMenu";
import Login from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Register from "../pages/auth/register";
import EmailReset from "../pages/auth/emailReset";
import UserDashboard from "../pages/Dashboard/userDashboard.js";
import ViewTicketPage from "../pages/ticket/viewTicketPage";
import DataTicketUserPage from "../pages/ticket/dataTicketUserPage";
import CreateTicketPage from "../pages/ticket/createTicketPage";
import DataTicketPicPage from "../pages/ticketForPic/dataTicketPicPage";
import ViewTicketPicPage from "../pages/ticketForPic/viewTicketPicPage";
import DataTicketPage from "../pages/ticketAll/dataTicketPage";
import CreateTicketAdminPage from "../pages/ticketAll/createTicketAdminPage";
import ViewTicketAdminPage from "../pages/ticketAll/viewTicketAdminPage";
import UpdateTicketAdminPage from "../pages/ticketAll/updateTicketAdminPage";
import ViewDataUser from "../pages/user/viewDataUserPage";
import ViewUserByIdPage from "../pages/user/viewUserByIdPage";
import EditUserByIdPage from "../pages/user/editUserByIdPage";
import CreateUserPage from "../pages/user/createUserPage";
import ViewSliderPage from "../pages/slider/viewSliderPage";
import CreateSliderPage from "../pages/slider/createSliderPage";
import ViewSliderByIdPage from "../pages/slider/viewSliderByIdPage";
import DataDevisiPage from "../pages/devisi/dataDevisiPage";
import CreateDevisiPage from "../pages/devisi/createDevisiPage";
import UpdateDevisiPage from "../pages/devisi/updateDevisiPage";
import DataPenempatanPage from "../pages/penempatan/dataPenempatanPage";
import CreatePenempatanPage from "../pages/penempatan/createPenempatanPage";
import UpdatePenempatanPage from "../pages/penempatan/updatePenempatanPage";
import DataStatusNotePage from "../pages/statusNote/dataStatusNotePage";
import CreateStatusNotePage from "../pages/statusNote/createStatusNotePage";
import DataStatusUserPage from "../pages/statusUser/dataStatusUserPage";
import CreateStatusUserPage from "../pages/statusUser/createStatusUserPage";
import UpdateStatusUserPage from "../pages/statusUser/updateStatusUserPage";
import DataTypeTicketPage from "../pages/typeTicket/dataTypeTicketPage";
import CreateTypeTicketPage from "../pages/typeTicket/createTypeTicketPage";
import UpdateTypeTicketPage from "../pages/typeTicket/updateTypeTicketPage";
import EditPrivilegeById from "../pages/privilege/editPrivilegeById";

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
          path: "/user/data/",
          element: <ViewDataUser />,
        },
        {
          path: "/user/data/:id",
          element: <ViewUserByIdPage />,
        },
        {
          path: "/user/edit/:id",
          element: <EditUserByIdPage />,
        },
        {
          path: "/user/create",
          element: <CreateUserPage />,
        },
        {
          path: "/privilege/edit/:id",
          element: <EditPrivilegeById />,
        },
        {
          path: "/slider/data",
          element: <ViewSliderPage />,
        },
        {
          path: "/slider/data/:id",
          element: <ViewSliderByIdPage />,
        },
        {
          path: "/slider/create",
          element: <CreateSliderPage />,
        },
        //attribute
        {
          path: "/devisi/data",
          element: <DataDevisiPage />,
        },
        {
          path: "/devisi/create",
          element: <CreateDevisiPage />,
        },
        {
          path: "/devisi/update/:id",
          element: <UpdateDevisiPage />,
        },
        {
          path: "/penempatan/data",
          element: <DataPenempatanPage />,
        },
        {
          path: "/penempatan/create",
          element: <CreatePenempatanPage />,
        },
        {
          path: "/penempatan/update/:id",
          element: <UpdatePenempatanPage />,
        },
        {
          path: "/statusNote/data",
          element: <DataStatusNotePage />,
        },
        {
          path: "/statusNote/create",
          element: <CreateStatusNotePage />,
        },
        {
          path: "/statusUser/data",
          element: <DataStatusUserPage />,
        },
        {
          path: "/statusUser/create",
          element: <CreateStatusUserPage />,
        },
        {
          path: "/statusUser/update/:id",
          element: <UpdateStatusUserPage />,
        },
        {
          path: "/typeTicket/data",
          element: <DataTypeTicketPage />,
        },
        {
          path: "/typeTicket/create",
          element: <CreateTypeTicketPage />,
        },
        {
          path: "/typeTicket/update/:id",
          element: <UpdateTypeTicketPage />,
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
