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
import AddIncome from "../AddIncome/AddIncome";
import IncomeList from "../IncomeList/IncomeList";
import IncomeReport from "../IncomeReport/IncomeReport";
import AddExpense from "../AddExpense/AddExpense";
import AddExpenseList from "../AddExpenseList/AddExpenseList";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Error from "../Error/Error";
import UttarPara from "../UttarPara/UttarPara";
import DokkhinPara from "../DokkhinPara/DokkhinPara";
import MajaPara from "../MajaPara/MajaPara";
import RiceCollection from "../RiceCollection/RiceCollection";
import OutCollection from "../OutCollection/OutCollection";
import ExpenseReport from "../ExpenseReport/ExpenseReport";
import Stats from "../Stats/Stats";
import Overview from "../Overview/Overview";
import PujaSchedule from "../PujaShcedule/PujaShcdule";
import UploadFile from "../Upload/UploadFile";
import CurrentBills from "../CurrentBills/CurrentBills";
import PujarKhoroz from "../PujarKhoroz/PujarKhoroz.";
import ProsadBills from "../ProsadBills/ProsadBills";
import OutsideBills from "../OutsideBills/OutsideBills";
import DecorationBills from "../DecorationBills/DecorationBills";
import KhoriBills from "../KhoriBills/KhoriBills";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement : <Error></Error>,
           

    
    children: [
      {
        index: true,
  
        loader: () => fetch('/jsonData.json'),
        element: <PrivateRoute><Home /></PrivateRoute>,
       
      },
      {
        path: "/accounts",
        element: <PrivateRoute> <Accounts /></PrivateRoute>
      },
      {
        path: "/contacts",
        element: <PrivateRoute><Contacts /></PrivateRoute>
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
      },
      {
        path: "/stats",
        element : <PrivateRoute> <Stats></Stats>   </PrivateRoute> 
      },
      {
        path: "/overview",
        element : <PrivateRoute> <Overview></Overview>   </PrivateRoute> 
      },
      {
        path: "/addIncome",
        element : <PrivateRoute> <AddIncome></AddIncome>   </PrivateRoute> 
      },
      {
        path: "/incomeList",
        element :<PrivateRoute> <IncomeList></IncomeList> </PrivateRoute>
      },
      {
        path: "/incomeReport",
        element :<PrivateRoute>  <IncomeReport></IncomeReport>   </PrivateRoute>
      },
      {
        path: "/addExpense",
        element : <PrivateRoute> <AddExpense></AddExpense>   </PrivateRoute>
      },
      {
        path: "/addExpenseList",
        element : <PrivateRoute><AddExpenseList></AddExpenseList> </PrivateRoute>
      },
      {
        path: "/expenseReport",
        element : <PrivateRoute><ExpenseReport></ExpenseReport> </PrivateRoute>
      },
      {
        path: "/pujaSchedule",
        element : <PrivateRoute><PujaSchedule></PujaSchedule> </PrivateRoute>
      },
      {
        path: "/uploadFile",
        element : <PrivateRoute><UploadFile></UploadFile> </PrivateRoute>
      },
      {
        path: "/uttarPara",
        element : <UttarPara></UttarPara>
      },
      {
        path: "/dokkhinPara",
        element : <DokkhinPara></DokkhinPara>
      },
      {
        path: "/MajaPara",
        element : <MajaPara></MajaPara>
      },
      {
        path: "/riceCollection",
        element : <RiceCollection></RiceCollection>
      },
      {
        path: "/outCollection",
        element : <OutCollection></OutCollection>
      },
      {
        path: "/expenses/puja",
        element : <PujarKhoroz></PujarKhoroz>
      },
      {
        path: "/expenses/electricity",
        element : <PrivateRoute><CurrentBills></CurrentBills> </PrivateRoute>
      },
      {
        path: "/expenses/prasad",
        element : <PrivateRoute><ProsadBills></ProsadBills> </PrivateRoute>
      },
      {
        path: "/expenses/outside",
        element : <PrivateRoute><OutsideBills></OutsideBills> </PrivateRoute>
      },
     
      {
        path: "/expenses/decoration",
        element : <PrivateRoute><DecorationBills></DecorationBills> </PrivateRoute>
      },
     
      {
        path: "/expenses/kharhi",
        element : <PrivateRoute><KhoriBills></KhoriBills> </PrivateRoute>
      },
     
    ]
  }
]);

export default router;
