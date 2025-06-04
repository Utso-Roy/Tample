import {
  createBrowserRouter,
} from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";
import Contacts from "../Contacts/Contacts";
import DetailsPage from "../DetailsPage/DetailsPage";
import Login from "../Login/Login";
import Register from "../Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        loader: () => fetch('/jsonData.json'),
        element: <Home />
      },
      {
        path: "/accounts",
        element: <Accounts />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: `detailsPage/:id`,
        element: <DetailsPage></DetailsPage>,
        loader: () => fetch('/jsonData.json'),

      },

      {
        path: '/login',
        element : <Login></Login>
      },
      {
        path: '/register',
        element : <Register></Register>
      }
    ]
  }
]);

export default router;
