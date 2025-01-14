import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../pages/common/Login/Login";
import { SignUp } from "../../pages/user/SignUp";
import { AdminDashboard } from "../../pages/admin/AdminDashboard";
import { Problems } from "../../components/Admin/Dashboard/Problems";
import { Notes } from "../../components/Admin/Dashboard/Notes";
import { Settings } from "../../components/Admin/Dashboard/Settings";
import { AdminProfile } from "../../components/Admin/Dashboard/AdminProfile";
import { UserHome } from "../../pages/user/UserHome";
import { CodewithAi } from "../../pages/user/CodewithAi";
import { PracticePage } from "../../pages/user/PracticePage";
import { ProfilePage } from "../../pages/user/ProfilePage";
import { CurrentUsers } from "../../components/Admin/Dashboard/CurrentUsers";
import { UserDetails } from "../../components/Admin/Dashboard/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    
  },
  {
    path: "SignUp",
    element: <SignUp/>,
    
  },
  {
    path : "AdminDashboard",
    element : <AdminDashboard/>,
    children : [
      {
        path : "CurrentUsers",
        element : <CurrentUsers/>,
      },
      {
        path : "Problems",
        element : <Problems/>,
      },
      {
        path : "Notes",
        element : <Notes/>,
      },
      {
        path : "Settings",
        element : <Settings/>,
      },
      
      {
        path : "AdminProfile",
        element : <AdminProfile/>,
      },
      {
        path: "UserDetails/:userId",
        element: <UserDetails/>
      },
      

    ]
  },
  {
    path : "UserHome",
    element : <UserHome/>,
  },
  {
    path : "CodewithAi",
    element : <CodewithAi/>,
  },
  {
    path : "PracticePage/:id",
    element : <PracticePage/>,
  },
  {
    path : "ProfilePage",
    element : <ProfilePage/>,
  },
  
 

]);
