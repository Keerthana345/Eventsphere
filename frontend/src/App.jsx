import RootLayout from "./RootLayout";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import EventParticipants from "./components/eventParticipants/EventParticipants"
import ManagerDashboard from "./components/managerDashboard/ManagerDashboard";
import AddEvent from "./components/addEvent/AddEvent"
import ViewEvents from "./components/viewEvents/ViewEvents"
import EditEvent from "./components/editEvent/EditEvent"
import ViewEvent from "./components/viewEvent/ViewEvent";
import ViewRegisteredUsers from "./components/viewRegisteredUsers/ViewRegisteredUsers";
import ViewUser from "./components/viewUser/ViewUser";
import EditUser from "./components/editUser/EditUser";
import EventListing from "./components/eventListing/EventListing";
import EventDetails from "./components/eventDetails/EventDetails";
import EventRegister from "./components/eventRegister/EventRegister";
import RegisteredUser from "./components/registeredUser/RegisteredUser";
import './App.css';

function App(){
  const browserRouter=createBrowserRouter([
    {
      path:'',
      element:<RootLayout />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:<Login />
        },
        {
          path:'eventParticipants',
          element:<EventParticipants />
        },
        {
          path:'managerDashboard',
          element:<ManagerDashboard />
        },
        {
          path:'addEvent',
          element:<AddEvent />
        },
        {
          path:'viewEvents',
          element:<ViewEvents />
        },
        {
          path:'editEvent/:id',
          element:<EditEvent/>
        },
        {
          path:'viewEvent',
          element:<ViewEvent />
        },
        {
          path:'viewRegisteredUsers/:id',
          element:<ViewRegisteredUsers />
        },
        {
          path:'viewUser',
          element:<ViewUser />
        },
        {
          path:'editUser',
          element:<EditUser />
        },
        {
          path:'eventListing',
          element:<EventListing />
        },
        {
          path:'eventDetails/:id',
          element:<EventDetails/>
        },
        {
          path:'eventRegister',
          element:<EventRegister/>
        },
        {
          path:'registeredUser',
          element:<RegisteredUser />
        }
      ]
    }
  ])
  return(
    <RouterProvider router={browserRouter} />
  )
}

export default App