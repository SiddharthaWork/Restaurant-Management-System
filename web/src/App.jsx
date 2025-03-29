import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import SignIn from "./layouts/authentication/SignIn";
import CounterIndex from "./layouts/counter/CounterIndex";
import Attendance from "./layouts/employee-management/Attendance";
import EmployeeDetails from "./layouts/employee-management/EmployeeDetails";
import ScheduleCalendar from "./layouts/employee-management/EmployeeScheduling";
import LogIndex from "./layouts/user-logs/LogIndex";
import MenuIndex from "./layouts/menu-management/MenuIndex";
import RecipeAndCosting from "./layouts/menu-management/RecipeAndCosting";
import RecipeAndCostingDetails from "./layouts/menu-management/RecipeAndCostingDetails";
import OrderIndex from "./layouts/order/OrderIndex";
import Dasthboard from "./layouts/outlet/Dasthboard";
import PermissionManagement from "./layouts/permission-management/PermissionIndex";
import EmployeeConfigurationIndex from "./layouts/software-configuration/employee/EmployeeConfigurationIndex";
import FinanceConfigurationIndex from "./layouts/software-configuration/finance/FinanceConfigurationIndex";
import ItemConfigurationIndex from "./layouts/software-configuration/item/ItemConfigurationIndex";
import MenuConfigurationIndex from "./layouts/software-configuration/menu/MenuConfigurationIndex";
import TableConfigurationIndex from "./layouts/software-configuration/table/TableConfiguratinIndex";
import Purchaselist from "./layouts/inventory-management/Purchaselist";
import Stock from "./layouts/inventory-management/Stock";
import Purchasereturn from "./layouts/inventory-management/Purchasereturn";
import Productionrate from "./layouts/inventory-management/Productionrate";
import ItemDetail from "./layouts/inventory-management/ItemDetail";
import Finance from "./layouts/finance-and-sales/Finance";
import Cashflow from "./layouts/finance-and-sales/Cashflow";
import ExpensesManagement from "./layouts/finance-and-sales/ExpensesManagement";
import VendorConfigurationIndex from "./layouts/software-configuration/vendor/VendorConfigurationIndex";
import WasteConfigurationIndex from "./layouts/software-configuration/waste/WasteConfigurationIndex";
import ReservationIndex from "./layouts/table-reservation/ReservationIndex";
import RoleIndex from "./layouts/user-role/RoleIndex";
import VendorIndex from "./layouts/vendor-management/VendorIndex";
import VendorDescription from "./layouts/vendor-management/components/VendorDescription";
import VendorPurchaseHistory from "./layouts/vendor-management/components/VendorPurchaseHistory";
import WasteIndex from "./layouts/waste-management/WasteIndex";
import { ErrorBoundary } from "react-error-boundary";
import DeliveryIndex from "./layouts/delivery-management/DeliveryIndex";
import AssignTable from "./layouts/employee-management/AssignTable";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import PublicRoute from "./components/authentication/PublicRoute";
import FallbackRoute from "./components/authentication/FallbackRoute";
// import DoAttendance from "./layouts/employee-management/components/DoAttendance";
const routes = [
  {
    path: "manage-order",
    children: [{ path: "order-details", element: <OrderIndex /> }],
  },
  {
    path: "table-reservation",
    element: <ReservationIndex />,
  },
  {
    path: "menu-management",
    children: [
      { path: "menu", element: <MenuIndex /> },
      { path: "recipe", element: <RecipeAndCosting /> },
      { path: "recipe/:recipeId", element: <RecipeAndCostingDetails /> },
    ],
  },
  {
    path: "permission-management",
    element: <PermissionManagement />,
  },
  {
    path: "log",
    element: <LogIndex />,
  },
  {
    path: "role",
    element: <RoleIndex />,
  },
  {
    path: "inventory-management",
    children: [
      { path: "purchase-management", element: <Purchaselist /> },
      { path: "purchase-management/return", element: <Purchasereturn /> },
      { path: "purchase-management/item", element: <ItemDetail /> },
      { path: "stock-level-tracking", element: <Stock /> },
      { path: "production-rate", element: <Productionrate /> },

      // { path: "vendor-management", element: <VendorList /> },
      { path: "vendor-management", element: <VendorIndex /> },
      { path: "vendor-management/:id", element: <VendorDescription /> },
      {
        path: "vendor-management/purchasehistory",
        element: <VendorPurchaseHistory />,
      },
    ],
  },
  {
    path: "software-configuration",
    children: [
      { path: "menu", element: <MenuConfigurationIndex /> },
      { path: "vendor", element: <VendorConfigurationIndex /> },
      { path: "purchase", element: <ItemConfigurationIndex /> },
      { path: "finance", element: <FinanceConfigurationIndex /> },
      { path: "reservation", element: <TableConfigurationIndex /> },
      { path: "waste", element: <WasteConfigurationIndex /> },
      { path: "employee", element: <EmployeeConfigurationIndex /> },
    ],
  },
  {
    path: "finance-Sales",
    children: [
      { path: "sales", element: <Finance /> },
      { path: "expense-management", element: <ExpensesManagement /> },
      { path: "cash-flow", element: <Cashflow /> },
      { path: "profit-loss", element: <></> },
    ],
  },

  {
    path: "counter",
    element: <CounterIndex />,
  },
  {
    path: "waste-management",
    element: <WasteIndex />,
  },
  {
    path: "employee-management",
    children: [
      { path: "attendance", element: <Attendance /> },
      { path: "employee-scheduling", element: <ScheduleCalendar /> },
      { path: "employee-details", element: <EmployeeDetails /> },
      { path: "assign-table", element: <AssignTable /> },
    ],
  },
  {
    path: "delivery-management",
    element: <DeliveryIndex />,
  },
];

const renderRoutes = (routes) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <SidebarProvider>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dasthboard />
              </ProtectedRoute>
            }
          >
            {renderRoutes(routes)}
          </Route>
          <Route path="*" element={<FallbackRoute />} />
        </Routes>
      </SidebarProvider>
    </ErrorBoundary>
  );
}

export default App;
